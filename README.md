# NZ Visa Autofill

Chrome extension for auto-filling the New Zealand Immigration **Working Holiday Visa** application form.

## Install

1. Open Chrome → `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked**
4. Select the `nz-visa-autofill` folder

## Usage

1. Go to the NZ Immigration Working Holiday application page (e.g. `onlineservices.immigration.govt.nz/WorkingHoliday/Wizard/...`)
2. Click the extension icon in the toolbar
3. Fill in your profile data across the tabs
4. Click **Save Profile** (data stays in your browser)
5. On each form page, click **Fill Form on Page** to auto-fill

## Coverage

| Section | Page | Extension Tab | Fields |
|---|---|---|---|
| PERSONAL | Personal1.aspx (Personal details) | Personal, Address, Contact | 24 |
| PERSONAL | Personal2.aspx (Identification) | ID | 6 |
| PERSONAL | Personal3.aspx (Occupation details) | Occupation | 2 |
| HEALTH | Medical1.aspx | Health | 9 |
| CHARACTER | Character.aspx | Character | 11 |
| ADVISER | Agent.aspx | Adviser | 17 |
| WHS SPECIFIC | WorkingHolidaySpecific.aspx | WHS | 7 |
| **Total** | **7 pages** | **9 tabs** | **78 fields** |

## How it works

The extension uses `chrome.storage.local` to persist profile data. When you click **Fill Form on Page**, the popup sends the saved data to a content script injected into the form page. The content script maps field keys to the exact ASP.NET WebForms control IDs and handles:

- Text inputs — native value setter + input/change events
- Select2 dropdowns — sets native `<select>` value + triggers select2 change
- jQuery UI datepickers — sets value + triggers `datepicker('setDate')`
- Textareas — direct value assignment + events

## Security Audit

**Status: ✅ No issues found**

All data stays in your browser. The extension has been audited for information leakage risks:

| Check | Result | Detail |
|---|---|---|
| Data storage | ✅ Local only | Uses `chrome.storage.local` — never leaves your browser, not synced to cloud |
| Network calls | ✅ None | Zero `fetch` / `XMLHttpRequest` calls in the entire codebase |
| Third-party endpoints | ✅ None | No analytics, telemetry, CDN, or external API endpoints |
| Permissions | ✅ Minimal | Only `storage` — no `cookies`, `webRequest`, `tabs`, `scripting` |
| Host permissions | ✅ Narrow scope | Matches only `onlineservices.immigration.govt.nz/WorkingHoliday/Wizard/*` |
| Content script scope | ✅ Specific | Only injects on the NZ immigration form pages |
| External resources | ✅ None | All HTML/CSS/JS bundled locally, no CDN or iframes |
| Data exfiltration | ✅ None | No `XMLHttpRequest`, `fetch`, `sendBeacon`, or WebSocket |
| Key logging / input capture | ✅ None | No `addEventListener('keydown')` or passive input monitoring |

**How data flows:**

```
Popup (popup.js)              Content Script (content.js)
    │                                  │
    │  User fills 78 fields            │
    │  Click "Save Profile"            │
    ├──→ chrome.storage.local ───→ persists in browser only
    │                                  │
    │  Click "Fill Form on Page"       │
    ├──→ chrome.tabs.sendMessage ──→  receives profile data
    │                    ┌─────────────┤
    │                    │  Maps keys to ASP.NET control IDs
    │                    │  Sets values via native DOM APIs
    │                    │  Triggers Select2 / datepicker sync
    │                    └─────────────┤
    │←── response {success, filled} ──┤
```

No data is ever sent to any server other than the NZ Immigration website itself (when you manually click SAVE on the form page).

## Files

```
nz-visa-autofill/
├── manifest.json         # Manifest V3
├── popup.html            # 9-tab profile form
├── popup.js              # Save/load/fill logic
├── content.js            # Page injection + 73 control ID mappings
├── styles.css            # Popup styling
├── background.js         # Service worker
└── icons/                # Extension icons
```
