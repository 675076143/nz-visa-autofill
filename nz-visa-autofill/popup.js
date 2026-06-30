// Country list shared across dropdowns
const COUNTRIES = [
  ["4","Afghanistan"],["5","Albania"],["6","Algeria"],["7","American Samoa"],["8","Andorra"],
  ["9","Angola"],["10","Anguilla"],["11","Antarctica"],["12","Antigua & Barbuda"],["13","Argentina"],
  ["14","Armenia"],["15","Aruba"],["16","Australia"],["17","Austria"],["18","Azerbaijan"],
  ["19","Bahamas"],["20","Bahrain"],["21","Bangladesh"],["22","Barbados"],["23","Belarus"],
  ["24","Belgium"],["25","Belize"],["26","Benin"],["27","Bermuda"],["28","Bhutan"],
  ["29","Bolivia"],["252","Bonaire, Sint Eustatius & Saba"],["30","Bosnia & Herzegovina"],["31","Botswana"],["32","Brazil"],
  ["33","British Indian Ocean Territory"],["34","Brunei Darussalam"],["35","Bulgaria"],["36","Burkina Faso"],["37","Burundi"],
  ["38","Cambodia"],["39","Cameroon"],["40","Canada"],["41","Cape Verde"],["42","Cayman Islands"],
  ["43","Central African Republic"],["44","Chad"],["45","Chile"],["46","China"],["47","Christmas Island"],
  ["48","Cocos (Keeling) Island"],["49","Colombia"],["50","Comoros"],["51","Congo"],["52","Cook Islands"],
  ["53","Costa Rica"],["54","Croatia"],["55","Cuba"],["253","Curacao"],["56","Cyprus"],
  ["57","Czech Republic"],["58","Democratic Republic of Congo"],["59","Denmark"],["60","Djibouti"],["61","Dominica"],
  ["62","Dominican Republic"],["63","East Timor"],["64","Ecuador"],["65","Egypt"],["66","El Salvador"],
  ["67","Equitorial Guinea"],["68","Eritrea"],["69","Estonia"],["70","Ethiopia"],["71","Faeroe Islands"],
  ["72","Falkland Islands"],["73","Federated States of Micronesia"],["74","Fiji"],["75","Finland"],["76","France"],
  ["77","French Guiana"],["78","French Polynesia"],["79","Gabon"],["80","Gambia"],["81","Georgia"],
  ["82","Germany"],["83","Ghana"],["84","Gibraltar"],["85","Great Britain"],["86","Greece"],
  ["87","Greenland"],["88","Grenada"],["89","Guadeloupe"],["90","Guam"],["91","Guatemala"],
  ["92","Guinea"],["93","Guinea - Bissau"],["94","Guyana"],["95","Haiti"],["96","Honduras"],
  ["97","Hong Kong"],["98","Hungary"],["99","Iceland"],["100","India"],["101","Indonesia"],
  ["102","Iran"],["103","Iraq"],["104","Ireland"],["105","Israel"],["106","Italy"],
  ["107","Ivory Coast"],["108","Jamaica"],["109","Japan"],["110","Jordan"],["111","Kazakhstan"],
  ["112","Kenya"],["113","Kiribati"],["114","Kosovo - UN Mission in"],["250","Kosovo - Republic of"],["115","Kuwait"],
  ["116","Kyrgyzstan"],["117","Laos"],["118","Latvia"],["119","Lebanon"],["120","Lesotho"],
  ["121","Liberia"],["122","Libya"],["123","Liechtenstein"],["124","Lithuania"],["125","Luxembourg"],
  ["126","Macau"],["127","Macedonia"],["128","Madagascar"],["129","Malawi"],["130","Malaysia"],
  ["131","Maldives"],["132","Mali"],["133","Malta"],["134","Marshall Islands"],["135","Martinique"],
  ["136","Mauritania"],["137","Mauritius"],["138","Mayotte"],["139","Mexico"],["140","Moldova"],
  ["141","Monaco"],["142","Mongolia"],["248","Montenegro"],["143","Montserrat"],["144","Morocco"],
  ["145","Mozambique"],["146","Myanmar"],["147","Namibia"],["148","Nauru"],["149","Nepal"],
  ["150","Netherlands"],["151","Netherlands Antilles"],["152","New Caledonia"],["153","New Zealand"],["154","Nicaragua"],
  ["155","Niger"],["156","Nigeria"],["157","Niue"],["158","Norfolk Island"],["159","North Korea"],
  ["160","Northern Mariana Islands"],["161","Norway"],["162","Oman"],["163","Pacific Island Trust Territory"],["164","Pakistan"],
  ["165","Palau"],["166","Palestine"],["167","Panama"],["168","Papua New Guinea"],["169","Paraguay"],
  ["170","Peru"],["171","Philippines"],["172","Pitcairn Islands"],["173","Poland"],["174","Portugal"],
  ["175","Puerto Rico"],["176","Qatar"],["177","Reunion"],["178","Romania"],["179","Russia"],
  ["180","Rwanda"],["181","Samoa"],["182","San Marino"],["183","Sao Tome & Principe"],["184","Saudi Arabia"],
  ["185","Senegal"],["247","Serbia"],["249","Serbia & Montenegro"],["186","Seychelles"],["187","Sierra Leone"],
  ["188","Singapore"],["254","Sint Maarten"],["189","Slovakia"],["190","Slovenia"],["191","Solomon Islands"],
  ["192","Somalia"],["193","South Africa"],["194","South Korea"],["195","South Pacific commission"],["251","South Sudan"],
  ["196","Soviet Union"],["197","Spain"],["198","Sri Lanka"],["199","St Helena"],["200","St Kitts - Nevis"],
  ["201","St Lucia"],["202","St Pierre & Miquelon"],["203","St Vincent and the Grenadines"],["204","Sth Georgia & Sandwich Islands"],["205","Sudan"],
  ["206","Suriname"],["207","Swaziland"],["208","Sweden"],["209","Switzerland"],["210","Syria"],
  ["211","Taiwan"],["212","Tajikistan"],["213","Tanzania"],["214","Thailand"],["215","Timor Leste"],
  ["216","Togo"],["217","Tokelau"],["218","Tonga"],["219","Trinidad and Tobago"],["220","Tunisia"],
  ["221","Turkemenistan"],["222","Turkey"],["223","Turks and Caicos Islands"],["224","Tuvalu"],["225","Uganda"],
  ["226","Ukraine"],["227","United Arab Emirates"],["228","United Nations"],["229","United States of America"],["230","Uruguay"],
  ["231","US Outlying Islands"],["232","US Pacific Islands"],["233","Uzbekistan"],["234","Vanuatu"],["235","Vatican City"],
  ["236","Venezuela"],["237","Vietnam"],["238","Virgin Islands, British"],["239","Virgin Islands, USA"],["240","Wallis and Futuna"],
  ["241","Western Sahara"],["242","Yemen"],["243","Yugoslavia"],["244","Zambia"],["245","Zimbabwe"]
];

// Populate country dropdowns
function populateCountries() {
  const selects = [
    document.getElementById('countryOfBirth'),
    document.getElementById('country'),
    document.getElementById('deportedCountry')
  ];
  selects.forEach(sel => {
    if (!sel) return;
    COUNTRIES.forEach(([val, label]) => {
      const opt = document.createElement('option');
      opt.value = val;
      opt.textContent = label;
      sel.appendChild(opt);
    });
  });
}

// Show/hide "Other title" field
function toggleOtherTitle() {
  const title = document.getElementById('title').value;
  document.getElementById('otherTitleGroup').style.display = title === '6' ? 'block' : 'none';
}

// Tab switching
function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
  });
}

// Load saved profile from chrome.storage
function loadProfile() {
  chrome.storage.local.get('visaProfile', (result) => {
    if (result.visaProfile) {
      Object.entries(result.visaProfile).forEach(([key, value]) => {
        const el = document.querySelector(`[data-field="${key}"]`);
        if (el) el.value = value || '';
      });
      toggleOtherTitle();
      showStatus('Profile loaded successfully', 'info');
    }
  });
}

// Save profile to chrome.storage
function saveProfile() {
  const profile = {};
  document.querySelectorAll('[data-field]').forEach(el => {
    profile[el.dataset.field] = el.value;
  });
  chrome.storage.local.set({ visaProfile: profile }, () => {
    showStatus('Profile saved successfully!', 'success');
  });
}

// Clear all fields
function clearAll() {
  document.querySelectorAll('[data-field]').forEach(el => {
    if (el.tagName === 'SELECT') el.selectedIndex = 0;
    else el.value = '';
  });
  toggleOtherTitle();
  chrome.storage.local.remove('visaProfile', () => {
    showStatus('All data cleared', 'info');
  });
}

// Send fill message to current tab
function fillForm() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (!tab || !tab.url || !tab.url.includes('onlineservices.immigration.govt.nz/WorkingHoliday')) {
      showStatus('Please open the NZ Immigration Working Holiday form page first', 'error');
      return;
    }
    // First save then fill
    const profile = {};
    document.querySelectorAll('[data-field]').forEach(el => {
      profile[el.dataset.field] = el.value;
    });
    chrome.storage.local.set({ visaProfile: profile }, () => {
      chrome.tabs.sendMessage(tab.id, { action: 'fillForm', data: profile }, (response) => {
        if (chrome.runtime.lastError) {
          showStatus('Error: ' + chrome.runtime.lastError.message + '. Try refreshing the form page.', 'error');
          return;
        }
        if (response && response.success) {
          showStatus('Form filled successfully!', 'success');
        } else if (response) {
          showStatus('Fill completed with ' + (response.errors || 0) + ' warnings', 'info');
        }
      });
    });
  });
}

function showStatus(msg, type) {
  const el = document.getElementById('status');
  el.textContent = msg;
  el.className = 'status ' + type;
  setTimeout(() => { el.style.display = 'none'; }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  populateCountries();
  setupTabs();
  loadProfile();

  document.getElementById('title').addEventListener('change', toggleOtherTitle);
  document.getElementById('saveBtn').addEventListener('click', saveProfile);
  document.getElementById('fillBtn').addEventListener('click', fillForm);
  document.getElementById('clearBtn').addEventListener('click', clearAll);
});
