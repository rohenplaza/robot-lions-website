# Robot Lions VEX Robotics Team Website

🦁 A modern, responsive website for the Robot Lions VEX Robotics Team, featuring a clean light blue and white theme with interactive navigation.

## 🌟 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Tab Navigation**: Smooth navigation between Home, Schedule, and Journal sections
- **Modern UI**: Clean design with light blue and white color scheme
- **Interactive Elements**: Smooth animations and hover effects
- **Accessibility**: Keyboard navigation support and ARIA labels
- **Performance**: Lightweight and fast-loading

## 📁 Project Structure

```
robot-lions-website/
├── index.html              # Main HTML file with tab structure
├── css/
│   └── styles.css          # All CSS styles and responsive design
├── js/
│   └── script.js           # JavaScript for tab functionality and interactions
├── assets/
│   └── images/             # Directory for team images (empty initially)
├── README.md               # Project documentation
└── CHANGELOG.md            # Version history and updates
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for version control)
- A text editor or IDE

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rohenplaza/robot-lions-website.git
   cd robot-lions-website
   ```

2. **Open the website:**
   - Simply open `index.html` in your web browser
   - Or use a local development server:
     ```bash
     # Using Python
     python -m http.server 8000
     # Or using Node.js
     npx serve .
     ```

3. **View the website:**
   - Navigate to `http://localhost:8000` (if using a server)
   - Or directly open `index.html` in your browser

## 📖 Usage

### Navigation
- **Home Tab**: Team introduction, mission, achievements, and values
- **Schedule Tab**: Regular meeting times and upcoming competition events
- **Journal Tab**: Team progress updates and development logs

### Customization

#### Adding Content
1. **Update Team Information**: Edit the content in `index.html`
2. **Add Events**: Modify the schedule section in the HTML
3. **New Journal Entries**: Add entries to the journal section
4. **Images**: Place team photos in `assets/images/` and reference them in HTML

#### Styling
1. **Colors**: Modify CSS custom properties in `styles.css`:
   ```css
   :root {
       --primary-blue: #4A90E2;
       --light-blue: #87CEEB;
       --white: #FFFFFF;
       /* Add your custom colors */
   }
   ```

2. **Layout**: Adjust grid layouts, spacing, and component styles in `styles.css`

#### Functionality
1. **JavaScript**: Modify `script.js` to add new features or interactions
2. **Tab System**: The tab manager automatically handles navigation

## 🎨 Design Features

### Color Scheme
- **Primary Blue**: #4A90E2
- **Light Blue**: #87CEEB
- **White**: #FFFFFF
- **Supporting Grays**: Various shades for text and backgrounds

### Components
- **Responsive Navigation**: Tab-based navigation with active states
- **Card Layout**: Information organized in clean, hoverable cards
- **Event Timeline**: Structured display of upcoming events
- **Journal Entries**: Blog-style entries with timestamps
- **Smooth Animations**: CSS transitions and JavaScript-powered effects

## 📱 Responsive Design

The website is fully responsive and optimized for:
- **Desktop**: Full-featured layout with side-by-side content
- **Tablet**: Adapted navigation and stacked layouts
- **Mobile**: Simplified navigation and single-column layouts

## 🔧 Technical Details

### HTML Structure
- Semantic HTML5 elements
- ARIA attributes for accessibility
- Organized tab-based content structure

### CSS Features
- CSS Grid and Flexbox for layouts
- CSS Custom Properties (variables)
- Media queries for responsive design
- CSS animations and transitions

### JavaScript Architecture
- Modular class-based organization
- Event-driven tab management
- Intersection Observer for animations
- Accessibility enhancements

## 🚀 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `gh-pages`)
4. Your site will be available at `https://username.github.io/repository-name`

### Other Hosting Options
- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Deploy with zero configuration
- **Firebase Hosting**: Google's hosting platform
- **Traditional Web Hosting**: Upload files via FTP

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 Customization Guide

### Adding New Tabs
1. Add navigation link in HTML header
2. Create corresponding content section
3. Update JavaScript tab manager with new tab name
4. Add appropriate styling in CSS

### Team Information Updates
- Update team achievements in the Home tab
- Add new events to the Schedule tab
- Create new journal entries for team progress

## 🏆 Robot Lions Team Information

- **Team Name**: Robot Lions
- **Competition**: VEX Robotics
- **Focus**: Innovation, teamwork, and competitive excellence
- **Values**: Collaboration, Innovation, Perseverance, Sportsmanship

## 📞 Support

For questions about the website or VEX Robotics:
- Check the [Issues](https://github.com/rohenplaza/robot-lions-website/issues) page
- Contact the team through the school
- Review VEX Robotics official documentation

## 📄 License

This project is created for the Robot Lions VEX Robotics Team. Feel free to use this template for your own robotics team website.

---

**Built with ❤️ by the Robot Lions Team**

*Go Robot Lions! 🦁🏆*