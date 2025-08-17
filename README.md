# RealEstate Pro - Static Website

A modern, responsive real estate website built with HTML, CSS, and JavaScript. Perfect for real estate agents and agencies to showcase properties, manage listings, and connect with potential clients.

## 🏠 Features

- **Property Listings**: Browse and search through available properties with advanced filtering
- **Property Details**: Comprehensive property pages with image galleries and contact forms
- **Contact System**: Multiple contact methods with inquiry forms and business information
- **Agent Dashboard**: Property management interface for real estate professionals
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with emerald color scheme

## 📱 Pages

- **Homepage** (`index.html`) - Property listings with search and filters
- **Property Details** (`property-1.html`, `property-2.html`, etc.) - Individual property pages
- **Contact** (`contact.html`) - Contact forms and business information
- **Dashboard** (`dashboard.html`) - Agent property management interface

## 🚀 Deployment to GitHub Pages

### Option 1: Direct Deployment

1. Fork or clone this repository
2. Go to your repository settings
3. Navigate to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"
7. Your site will be available at `https://yourusername.github.io/repository-name`

### Option 2: Using GitHub Actions (Recommended)

This repository includes a GitHub Actions workflow for automated deployment:

1. Fork or clone this repository
2. Go to repository Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically deploy your site on every push to main

### Option 3: Custom Domain

To use a custom domain:

1. Add a `CNAME` file to the root directory with your domain name
2. Configure your domain's DNS settings to point to GitHub Pages
3. Enable "Enforce HTTPS" in repository settings

## 🛠️ Local Development

To run the website locally:

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/realestate-pro.git
   cd realestate-pro
   \`\`\`

2. Open `index.html` in your web browser, or use a local server:
   \`\`\`bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   \`\`\`

3. Navigate to `http://localhost:8000`

## 📁 Project Structure

\`\`\`
realestate-pro/
├── index.html              # Main property listings page
├── contact.html             # Contact page
├── dashboard.html           # Agent dashboard
├── property-1.html          # Property detail pages
├── property-2.html
├── css/
│   └── styles.css          # Additional custom styles
├── js/
│   ├── app.js              # Main application logic
│   ├── contact.js          # Contact form functionality
│   ├── dashboard.js        # Dashboard functionality
│   └── property-detail.js  # Property detail interactions
├── images/                 # Property and UI images
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment
└── README.md               # This file
\`\`\`

## 🎨 Customization

### Colors
The website uses an emerald color scheme defined in the Tailwind configuration. To customize colors, update the `tailwind.config` object in each HTML file.

### Content
- **Properties**: Update the `properties` array in `js/app.js`
- **Contact Info**: Modify contact details in `contact.html`
- **Agent Info**: Update agent information in property detail pages

### Images
Replace placeholder images in the root directory with your own property photos. Maintain the same file names or update the references in the JavaScript files.

## 🔧 Configuration

### SEO Optimization
- Update meta descriptions in each HTML file
- Modify the `sitemap.xml` file with your actual URLs
- Customize `robots.txt` for search engine crawling preferences

### Analytics
Add your Google Analytics or other tracking codes to the `<head>` section of each HTML file.

### Contact Forms
The contact forms currently show success messages without actually sending emails. To enable real form submission:

1. Use a service like Formspree, Netlify Forms, or EmailJS
2. Update the form action attributes and JavaScript handlers
3. Configure your chosen service according to their documentation

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/realestate-pro/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

## 🙏 Acknowledgments

- Built with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Responsive design principles
- Modern web development best practices

---

**Ready to showcase your properties? Deploy this website and start connecting with potential clients today!**
