# 🕐 React Cron Generator

> A powerful, user-friendly React component for building cron expressions with support for both Unix and Quartz formats

[![npm version](https://badge.fury.io/js/react-cron-generator.svg)](https://badge.fury.io/js/react-cron-generator)
![Downloads](https://img.shields.io/npm/dm/react-cron-generator.svg)
[![license](https://img.shields.io/npm/l/react-cron-generator.svg)](https://github.com/sojinantony01/react-cron-generator/blob/main/LICENSE)
![React](https://img.shields.io/badge/React-16.8%2B%20%7C%2017%20%7C%2018%20%7C%2019-blue)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

## 🎮 [Try it Live!](https://sojinantony01.github.io/react-cron-generator/)

**[Interactive Demo →](https://sojinantony01.github.io/react-cron-generator/)**

## ✨ Features

- 🎯 **Dual Format Support** - Works with both Unix (5 fields) and Quartz (7 fields) cron formats
- 🔄 **Automatic Conversion** - Seamlessly convert between Unix and Quartz formats
- ✅ **Built-in Validation** - Comprehensive cron expression validation
- 🌍 **Internationalization** - Full i18n support with custom translation functions
- ♿ **Accessible** - WCAG compliant with keyboard navigation and screen reader support
- 📱 **Responsive** - Mobile-friendly design that works on all devices
- 🎨 **Customizable** - Easy to style and configure
- 🔒 **Type Safe** - Full TypeScript support with comprehensive type definitions
- ⚡ **Performance Optimized** - Memoized computations and efficient re-renders
- 🛡️ **Error Boundaries** - Graceful error handling built-in

## 📦 Installation

```bash
npm install react-cron-generator
```

or

```bash
yarn add react-cron-generator
```

## 🚀 Quick Start

### Basic Usage (Quartz Format)

```jsx
import React, { useState } from 'react';
import Cron from 'react-cron-generator';
import 'react-cron-generator/build/cron-builder.css';

function App() {
  const [value, setValue] = useState('0 0 00 1/1 * ? *');

  return (
    <Cron
      onChange={(cronValue, humanReadable) => {
        setValue(cronValue);
        console.log('Cron:', cronValue);
        console.log('Human:', humanReadable);
      }}
      value={value}
      showResultText={true}
      showResultCron={true}
    />
  );
}
```

### Unix Format

```jsx
import React, { useState } from 'react';
import Cron from 'react-cron-generator';
import 'react-cron-generator/build/cron-builder.css';

function App() {
  const [value, setValue] = useState('*/5 * * * *');

  return (
    <Cron
      onChange={(cronValue, humanReadable) => {
        setValue(cronValue);
      }}
      value={value}
      showResultText={true}
      showResultCron={true}
      isUnix={true}  // Enable Unix format
    />
  );
}
```

## 📸 Screenshots

![Cron Generator Interface](https://raw.githubusercontent.com/sojinantony01/react-cron-generator/master/public/images/Screenshot%20from%202019-06-08%2000-31-31.png)

![Cron Generator Options](https://raw.githubusercontent.com/sojinantony01/react-cron-generator/master/public/images/Screenshot%20from%202019-06-08%2000-31-57.png)

## 📖 Documentation

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `undefined` | Initial cron expression (Unix: 5 fields, Quartz: 6 or 7 fields) |
| `onChange` | `(value: string, text: string) => void` | **Required** | Callback fired when cron value changes. Receives cron expression and human-readable text |
| `showResultText` | `boolean` | `false` | Display human-readable description below the builder |
| `showResultCron` | `boolean` | `false` | Display the cron expression below the builder |
| `isUnix` | `boolean` | `false` | Use Unix format (5 fields) instead of Quartz. **Cannot be used with `use6FieldQuartz`** |
| `use6FieldQuartz` | `boolean` | `false` | Use 6-field Quartz format instead of 7-field. **Cannot be used with `isUnix`** |
| `translateFn` | `(key: string) => string` | `undefined` | Custom translation function for i18n support |
| `locale` | `string` | `'en'` | Locale for cronstrue (human-readable text) |
| `options` | `{ headers: HeaderType[] }` | All headers | Customize which tabs are available |
| `disabled` | `boolean` | `false` | Disable the entire component |

### Format Comparison

| Feature | Unix (5 fields) | Quartz (6 fields) | Quartz (7 fields) |
|---------|----------------|-------------------|-------------------|
| **Format** | `minute hour day month day-of-week` | `second minute hour day month day-of-week` | `second minute hour day month day-of-week year` |
| **Example** | `*/5 * * * *` | `0 */5 * * * ?` | `0 0/5 * * * ? *` |
| **Day of Week** | 0-6 (Sunday=0) | 1-7 (Sunday=1) or SUN-SAT | 1-7 (Sunday=1) or SUN-SAT |
| **Special Chars** | `* , - /` | `* , - / ? L W #` | `* , - / ? L W #` |
| **Used By** | Linux/Unix cron, most cron implementations | Quartz Scheduler (legacy) | Quartz Scheduler, Spring Framework, Java apps |

### 6-Field Quartz Format Support

The component supports both 6-field and 7-field Quartz formats:

- **6-field format**: `second minute hour day month day-of-week` (e.g., `0 0 12 * * ?`)
- **7-field format**: `second minute hour day month day-of-week year` (e.g., `0 0 12 * * ? *`)

**Format Behavior:**

The `use6FieldQuartz` prop controls the output format:

```jsx
// Default: 7-field Quartz format
<Cron
  value="0 0 12 * * ?"  // 6-field input
  onChange={(value) => {
    console.log(value);  // "0 0 12 * * ? *" - converted to 7-field
  }}
  showResultText={true}
  showResultCron={true}
/>

// Explicitly use 6-field Quartz format
<Cron
  value="0 0 12 * * ? *"  // 7-field input
  onChange={(value) => {
    console.log(value);  // "0 0 12 * * ?" - converted to 6-field
  }}
  showResultText={true}
  showResultCron={true}
  use6FieldQuartz={true}  // Enable 6-field format
/>
```

**Rules:**
- **`use6FieldQuartz={false}` (default)**: Always outputs 7-field format, even if 6-field input is provided
- **`use6FieldQuartz={true}`**: Always outputs 6-field format, even if 7-field input is provided
- Cannot use both `isUnix={true}` and `use6FieldQuartz={true}` together - this will throw an error
- Internally, the component always works with 7-field format for processing

## 🔧 Advanced Usage

### Format Conversion

```jsx
import { 
  unixToQuartz, 
  quartzToUnix, 
  detectCronFormat 
} from 'react-cron-generator';

// Convert Unix to Quartz
const quartzCron = unixToQuartz('*/5 * * * *');
console.log(quartzCron); // '0 */5 * * * ? *'

// Convert Quartz to Unix
const unixCron = quartzToUnix('0 0/5 * * * ? *');
console.log(unixCron); // '*/5 * * * *'

// Auto-detect format
const format = detectCronFormat('*/5 * * * *');
console.log(format); // 'unix'
```

### Validation

```jsx
import { validateCron } from 'react-cron-generator';

// Validate any format (auto-detects Unix or Quartz)
const result = validateCron('*/5 * * * *');
console.log(result);
// { isValid: true, format: 'unix' }

// Check validation result
if (result.isValid) {
  console.log('Valid cron expression!');
} else {
  console.error('Invalid:', result.error);
}
```

### Custom Tabs

```jsx
import Cron, { HEADER } from 'react-cron-generator';

const options = {
  headers: [
    HEADER.MINUTES,
    HEADER.HOURLY,
    HEADER.DAILY,
    HEADER.WEEKLY,
    HEADER.MONTHLY,
    HEADER.CUSTOM
  ]
};

<Cron options={options} {...otherProps} />
```

### Internationalization

```jsx
import Cron from 'react-cron-generator';

const translations = {
  'Every': 'Cada',
  'minute(s)': 'minuto(s)',
  // ... more translations
};

function translateFn(key) {
  return translations[key] || key;
}

<Cron
  translateFn={translateFn}
  locale="es"  // For cronstrue
  {...otherProps}
/>
```


## 🎨 Styling

The component comes with default styles. Import the CSS file:

```jsx
import 'react-cron-generator/build/cron-builder.css';
```

You can override styles by targeting the CSS classes:

```css
.cron_builder {
  /* Your custom styles */
}

.cron_builder .nav-link {
  /* Customize tabs */
}

.cron_builder_bordering {
  /* Customize content area */
}
```

## 📚 API Reference

### Exported Components

- `Cron` - Main cron builder component (default export)

### Exported Utilities

- `unixToQuartz(cron: string): string` - Convert Unix to Quartz format
- `quartzToUnix(cron: string): string` - Convert Quartz to Unix format
- `detectCronFormat(cron: string): 'unix' | 'quartz'` - Detect cron format
- `validateCron(cron: string): ValidationResult` - Validate any cron format (auto-detects Unix or Quartz)
- `HEADER` - Constants for tab headers
- `cronstrue` - Human-readable cron descriptions (from cronstrue/i18n)

### Exported Types

- `CronProps` - Props for Cron component
- `CronFormat` - 'unix' | 'quartz'
- `CronValidationResult` - Validation result interface
- `TranslateFn` - Translation function type
- And many more...

## 🎯 Examples

### Example 1: Every 5 Minutes

**Unix:** `*/5 * * * *`  
**Quartz:** `0 0/5 * * * ? *`  
**Human:** "Every 5 minutes"

### Example 2: Every Day at 2:30 PM

**Unix:** `30 14 * * *`  
**Quartz:** `0 30 14 * * ? *`  
**Human:** "At 02:30 PM"

### Example 3: Every Monday at 9:00 AM

**Unix:** `0 9 * * 1`  
**Quartz:** `0 0 9 ? * MON *`  
**Human:** "At 09:00 AM, only on Monday"

### Example 4: First Day of Every Month

**Unix:** `0 0 1 * *`  
**Quartz:** `0 0 0 1 * ? *`  
**Human:** "At 12:00 AM, on day 1 of the month"

## 🔍 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [cronstrue](https://github.com/bradymholt/cRonstrue) - For human-readable cron descriptions
- [Viswanath Lekshmanan](https://viswanathl.in/) - Original inspiration

## 👨‍💻 Author

**Sojin Antony**

- GitHub: [@sojinantony01](https://github.com/sojinantony01)
- Buy me a coffee: [!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg)](https://www.buymeacoffee.com/sojinantony)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

## 📊 Stats

![npm](https://img.shields.io/npm/dt/react-cron-generator)
![GitHub stars](https://img.shields.io/github/stars/sojinantony01/react-cron-generator)
![GitHub issues](https://img.shields.io/github/issues/sojinantony01/react-cron-generator)

## 🔗 Links

- [Live Demo](https://sojinantony01.github.io/react-cron-generator/)
- [NPM Package](https://www.npmjs.com/package/react-cron-generator)
- [GitHub Repository](https://github.com/sojinantony01/react-cron-generator)
- [Issue Tracker](https://github.com/sojinantony01/react-cron-generator/issues)

---

Made with ❤️ by [Sojin Antony](https://github.com/sojinantony01)
