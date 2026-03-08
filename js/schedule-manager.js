/**
 * ScheduleManager - Handles dynamic schedule loading from Google Sheets API
 *
 * This class fetches event data from a Google Spreadsheet and renders it
 * dynamically on the page, replacing the static HTML schedule.
 *
 * Features:
 * - Fetches data from Google Sheets API v4
 * - Caches data in sessionStorage for performance
 * - Handles loading states and errors gracefully
 * - Maintains existing CSS styling and animations
 * - Separates upcoming and past events
 */

class ScheduleManager {
    /**
     * Initialize the Schedule Manager
     * @param {Object} config - Configuration object with API credentials
     */
    constructor(config) {
        this.apiKey = config.apiKey;
        this.spreadsheetId = config.spreadsheetId;
        this.upcomingRange = config.upcomingRange || 'Upcoming Events!A2:E';
        this.pastRange = config.pastRange || 'Past Events!A2:E';
        this.cacheEnabled = config.cacheEnabled !== false;
        this.cacheDuration = config.cacheDuration || 300000; // 5 minutes default

        this.container = document.querySelector('#schedule-data');
        this.upcomingEvents = [];
        this.pastEvents = [];

        if (!this.container) {
            console.error('Schedule container not found');
            return;
        }

        this.init();
    }

    /**
     * Initialize the schedule by loading data
     */
    async init() {
        this.showLoadingState();

        try {
            // Try to load from cache first
            if (this.cacheEnabled && this.loadFromCache()) {
                console.log('Loading schedule from cache');
                this.renderSchedule();
                return;
            }

            // Fetch fresh data from API
            await this.fetchScheduleData();
            this.renderSchedule();
        } catch (error) {
            console.error('Error loading schedule:', error);
            this.handleError(error);
        }
    }

    /**
     * Display loading spinner while fetching data
     */
    showLoadingState() {
        this.container.innerHTML = `
            <div class="schedule-loading">
                <div class="spinner"></div>
                <p>Loading schedule...</p>
            </div>
        `;
    }

    /**
     * Fetch schedule data from Google Sheets API
     */
    async fetchScheduleData() {
        // Build batch API URL to fetch both sheets in one request
        const baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
        const ranges = [
            encodeURIComponent(this.upcomingRange),
            encodeURIComponent(this.pastRange)
        ];
        const url = `${baseUrl}/${this.spreadsheetId}/values:batchGet?ranges=${ranges[0]}&ranges=${ranges[1]}&key=${this.apiKey}`;

        console.log('Fetching schedule from Google Sheets...');

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Parse the response data
        this.upcomingEvents = this.parseEvents(data.valueRanges[0].values || []);
        this.pastEvents = this.parseEvents(data.valueRanges[1].values || []);

        console.log(`Loaded ${this.upcomingEvents.length} upcoming events and ${this.pastEvents.length} past events`);

        // Cache the data
        if (this.cacheEnabled) {
            this.cacheData();
        }
    }

    /**
     * Parse raw spreadsheet data into event objects
     * @param {Array} rows - Array of row arrays from Google Sheets
     * @returns {Array} Array of event objects
     */
    parseEvents(rows) {
        return rows
            .filter(row => row.length >= 4) // Must have at least date, title, location, time
            .map(row => ({
                date: this.sanitize(row[0] || ''),
                title: this.sanitize(row[1] || 'Untitled Event'),
                location: this.sanitize(row[2] || 'TBD'),
                time: this.sanitize(row[3] || 'TBD'),
                agenda: this.sanitize(row[4] || '')
            }))
            .filter(event => event.date && event.title); // Must have date and title
    }

    /**
     * Sanitize user input to prevent XSS
     * @param {string} str - Input string
     * @returns {string} Sanitized string
     */
    sanitize(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Render the complete schedule on the page
     */
    renderSchedule() {
        // Generate HTML for upcoming events
        const upcomingHTML = this.upcomingEvents.length > 0
            ? this.upcomingEvents.map(e => this.formatEventHTML(e, false)).join('')
            : '<p class="no-events">No upcoming events scheduled.</p>';

        // Generate HTML for past events
        const pastHTML = this.pastEvents.length > 0
            ? this.pastEvents.map(e => this.formatEventHTML(e, true)).join('')
            : '<p class="no-events">No past events.</p>';

        // Combine into full schedule HTML
        const scheduleHTML = `
            <h3>Upcoming Events</h3>
            <div class="event-list">
                ${upcomingHTML}
            </div>
            <h3>Past Events</h3>
            <div class="event-list">
                ${pastHTML}
            </div>
        `;

        this.container.innerHTML = scheduleHTML;

        // Trigger animations for the newly added events
        this.applyAnimations();
    }

    /**
     * Format a single event as HTML
     * @param {Object} event - Event object with date, title, location, time, agenda
     * @param {boolean} isPast - Whether this is a past event (adds checkmark)
     * @returns {string} HTML string for the event
     */
    formatEventHTML(event, isPast = false) {
        const hasAgenda = event.agenda && event.agenda.trim() !== '';
        const checkmark = isPast ? ' ✅' : '';

        return `
            <div class="event">
                <div class="date">${event.date}</div>
                <div class="details">
                    <h4>${event.title}${checkmark}</h4>
                    <p>Location: ${event.location}</p>
                    <p>Time: ${event.time}</p>
                    ${hasAgenda ? `<p>Agenda: ${event.agenda}</p>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Apply scroll animations to event elements
     */
    applyAnimations() {
        // Use Intersection Observer to animate events on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all event elements
        document.querySelectorAll('.event').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    /**
     * Handle errors by displaying user-friendly message
     * @param {Error} error - The error that occurred
     */
    handleError(error) {
        let message = 'Error loading schedule. Please try again later.';

        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            message = 'Unable to load schedule. Please check your internet connection.';
        } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
            message = 'Schedule temporarily unavailable. Please check API permissions.';
        } else if (error.message.includes('404') || error.message.includes('Not Found')) {
            message = 'Schedule not found. Please check the spreadsheet configuration.';
        }

        // Try to load from cache as fallback
        if (this.cacheEnabled && this.loadFromCache()) {
            this.showWarning('Showing cached schedule data (may be outdated)');
            this.renderSchedule();
            return;
        }

        // Show error message if no cache available
        this.showError(message);
    }

    /**
     * Display error message to user
     * @param {string} message - Error message to display
     */
    showError(message) {
        const errorHTML = `
            <div class="schedule-error">
                <h3>⚠️ Schedule Unavailable</h3>
                <p>${message}</p>
                <p>For the latest schedule updates, please contact the Robot Lions team.</p>
            </div>
        `;
        this.container.innerHTML = errorHTML;
    }

    /**
     * Display warning banner above schedule
     * @param {string} message - Warning message to display
     */
    showWarning(message) {
        const warningHTML = `
            <div class="schedule-warning">
                <p>⚠️ ${message}</p>
            </div>
        `;
        this.container.insertAdjacentHTML('afterbegin', warningHTML);
    }

    /**
     * Cache schedule data in sessionStorage
     */
    cacheData() {
        const cacheObject = {
            upcomingEvents: this.upcomingEvents,
            pastEvents: this.pastEvents,
            timestamp: Date.now()
        };

        try {
            sessionStorage.setItem('robotLionsScheduleCache', JSON.stringify(cacheObject));
            console.log('Schedule data cached successfully');
        } catch (e) {
            console.warn('Failed to cache schedule data:', e);
        }
    }

    /**
     * Load schedule data from sessionStorage cache
     * @returns {boolean} True if cache was loaded successfully
     */
    loadFromCache() {
        try {
            const cached = sessionStorage.getItem('robotLionsScheduleCache');
            if (!cached) return false;

            const cacheObject = JSON.parse(cached);
            const age = Date.now() - cacheObject.timestamp;

            // Check if cache is expired
            if (age > this.cacheDuration) {
                console.log('Cache expired, removing...');
                sessionStorage.removeItem('robotLionsScheduleCache');
                return false;
            }

            // Load data from cache
            this.upcomingEvents = cacheObject.upcomingEvents;
            this.pastEvents = cacheObject.pastEvents;

            console.log(`Cache is ${Math.round(age / 1000)}s old (max ${this.cacheDuration / 1000}s)`);
            return true;
        } catch (e) {
            console.warn('Failed to load cache:', e);
            return false;
        }
    }
}
