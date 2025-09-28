# M.A.R.I.S Dashboard

**Maritime Alerts & Reporting Information System**

A comprehensive dashboard system for maritime emergency management, featuring both Official and Analyst interfaces for monitoring, verifying, and analyzing maritime incidents across India's coastline.

## 🌊 Features

### Official Dashboard
- **Login & Role Selection**: Secure authentication with jurisdiction-based access
- **Map Overview**: Interactive map showing real-time incident reports with filtering
- **Verification Queue**: Review and verify citizen reports with AI analysis
- **Assignment Tracking**: Assign field teams and track response progress
- **Alerts & Advisories**: Issue emergency alerts to targeted geographic areas
- **Reports Export**: Export data and view audit logs of official actions

### Analyst Dashboard
- **National Map**: Heatmap visualization of hazard density across India
- **Trends & Hotspots**: Charts and analytics showing incident patterns
- **Social Media Integration**: Monitor social feeds and official data sources
- **Predictive Analytics**: AI-powered risk assessment and hazard prediction

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Demo Credentials

### Official Dashboard
- Username: `admin`
- Password: `password`
- Role: Official
- Jurisdiction: Any district

### Analyst Dashboard
- Username: `analyst`
- Password: `password`
- Role: Analyst

## 🛠️ Technology Stack

- **Frontend**: React 18, React Router
- **Styling**: Tailwind CSS
- **Maps**: React Leaflet, OpenStreetMap
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Create React App

## 📱 Key Components

### Authentication System
- Role-based access control
- Jurisdiction selection for officials
- Secure login/logout functionality

### Interactive Maps
- Real-time incident visualization
- Clustering and filtering
- Heatmap overlays for national view
- Timeline controls for historical data

### Data Visualization
- Responsive charts and graphs
- Real-time statistics
- Trend analysis
- Predictive modeling displays

### Responsive Design
- Mobile-first approach
- Cross-device compatibility
- Modern UI/UX patterns

## 🌐 System Architecture

The dashboard follows a modular architecture:

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── official/       # Official dashboard pages
│   └── analyst/        # Analyst dashboard pages
├── context/            # React context for state management
└── App.js             # Main application router
```

## 🔧 Configuration

The system is configured for:
- Indian coastal regions (Mumbai, Chennai, Kochi, etc.)
- Maritime incident categories (flooding, pollution, weather, infrastructure)
- Multi-language support ready
- Scalable data integration

## 📊 Data Sources

The system integrates with:
- Citizen reports via mobile app
- INCOIS (Indian National Centre for Ocean Information Services)
- IMD (India Meteorological Department)
- ISRO satellite data
- Social media feeds
- Coast Guard reports

## 🚨 Emergency Response Workflow

1. **Citizen Reporting**: Citizens submit reports via mobile app
2. **AI Classification**: Automatic categorization and severity assessment
3. **Official Verification**: Officials review and verify reports
4. **Team Assignment**: Field teams assigned for response
5. **Alert Distribution**: Targeted alerts sent to affected areas
6. **Progress Tracking**: Real-time status updates
7. **Analytics**: Data aggregation for trend analysis

## 🎯 Future Enhancements

- Real-time WebSocket integration
- Advanced ML models for prediction
- Multi-language interface
- Mobile app integration
- API documentation
- Advanced reporting features

## 📄 License

This project is developed for the Smart India Hackathon 2025 and is intended for educational and demonstration purposes.

## 🤝 Contributing

This is a hackathon project. For questions or suggestions, please contact the development team.

---

**M.A.R.I.S** - Protecting India's Maritime Heritage Through Technology
