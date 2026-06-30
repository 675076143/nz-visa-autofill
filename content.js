(function () {
  'use strict';

  // Field ID map: our data-field key -> the website's element selector/accessor
  // We use the actual ASP.NET client IDs from the saved HTML
  const FIELD_MAP = {
    familyName:    { id: 'ContentPlaceHolder1_personDetails_familyNameTextBox',          type: 'text' },
    givenName1:    { id: 'ContentPlaceHolder1_personDetails_givenName1Textbox',          type: 'text' },
    givenName2:    { id: 'ContentPlaceHolder1_personDetails_givenName2Textbox',          type: 'text' },
    givenName3:    { id: 'ContentPlaceHolder1_personDetails_givenName3Textbox',          type: 'text' },
    otherNames:    { id: 'ContentPlaceHolder1_personDetails_otherNamesTextBox',          type: 'text' },
    otherTitle:    { id: 'ContentPlaceHolder1_personDetails_otherTitleTextBox',          type: 'text' },
    streetNumber:  { id: 'ContentPlaceHolder1_addressContactDetails_address_streetNumberTextbox', type: 'text' },
    streetName:    { id: 'ContentPlaceHolder1_addressContactDetails_address_address1TextBox',     type: 'text' },
    suburb:        { id: 'ContentPlaceHolder1_addressContactDetails_address_suburbTextBox',       type: 'text' },
    city:          { id: 'ContentPlaceHolder1_addressContactDetails_address_cityTextBox',         type: 'text' },
    provinceState: { id: 'ContentPlaceHolder1_addressContactDetails_address_provinceStateTextBox', type: 'text' },
    postalCode:    { id: 'ContentPlaceHolder1_addressContactDetails_address_postalCodeTextBox',   type: 'text' },
    phoneDaytime:  { id: 'ContentPlaceHolder1_addressContactDetails_contactDetails_phoneNumberTextBox',     type: 'text' },
    phoneNight:    { id: 'ContentPlaceHolder1_addressContactDetails_contactDetails_phoneNumberNightTextBox', type: 'text' },
    phoneMobile:   { id: 'ContentPlaceHolder1_addressContactDetails_contactDetails_phoneNumberMobileTextBox', type: 'text' },
    fax:           { id: 'ContentPlaceHolder1_addressContactDetails_contactDetails_faxNumberTextbox',        type: 'text' },
    email:         { id: 'ContentPlaceHolder1_addressContactDetails_contactDetails_emailAddressTextBox',     type: 'text' },
    dateOfBirth:   { id: 'ContentPlaceHolder1_personDetails_dateOfBirthDatePicker_DatePicker', type: 'datepicker' },
    passportNumber:      { id: 'ContentPlaceHolder1_identification_passportNumberTextBox',                    type: 'text' },
    confirmPassportNumber:{ id: 'ContentPlaceHolder1_identification_confirmPassportNumberTextBox',            type: 'text' },
    passportExpiryDate:  { id: 'ContentPlaceHolder1_identification_passportExpiryDateDatePicker_DatePicker',  type: 'datepicker' },
    secondIdIssueDate:   { id: 'ContentPlaceHolder1_identification_otherIssueDateDatePicker_DatePicker',     type: 'datepicker' },
    secondIdExpiryDate:  { id: 'ContentPlaceHolder1_identification_otherExpiryDateDatePicker_DatePicker',    type: 'datepicker' },
    industrySearch:      { id: 'ContentPlaceHolder1_generalPersonal_industryControl_optionListSearch_SearchStringTextBox', type: 'text' },
    occupationSearch:    { id: 'ContentPlaceHolder1_generalPersonal_occupationControl_optionListSearch_SearchStringTextBox', type: 'text' },
    healthDetails:       { id: 'ContentPlaceHolder1_medicalConditions_healthDetailsTextBox', type: 'textarea' },
    deportedDate:        { id: 'ContentPlaceHolder1_character_deportedDateDatePicker_DatePicker', type: 'datepicker' },
    characterDetails:    { id: 'ContentPlaceHolder1_character_excludeRemovedDetailsTextBox', type: 'textarea' },
    adviserFamilyName:   { id: 'ContentPlaceHolder1_adviserDetails_adviserFamilyNameTextBox', type: 'text' },
    adviserGivenName1:   { id: 'ContentPlaceHolder1_adviserDetails_adviserGivenName1TextBox', type: 'text' },
    adviserGivenName2:   { id: 'ContentPlaceHolder1_adviserDetails_adviserGivenName2TextBox', type: 'text' },
    adviserCompany:      { id: 'ContentPlaceHolder1_adviserDetails_companyOrganisationTextBox', type: 'text' },
    adviserStreetNumber: { id: 'ContentPlaceHolder1_adviserDetails_addressContactDetails_address_streetNumberTextbox', type: 'text' },
    adviserStreetName:   { id: 'ContentPlaceHolder1_adviserDetails_addressContactDetails_address_address1TextBox', type: 'text' },
    adviserSuburb:       { id: 'ContentPlaceHolder1_adviserDetails_addressContactDetails_address_suburbTextBox', type: 'text' },
    adviserCity:         { id: 'ContentPlaceHolder1_adviserDetails_addressContactDetails_address_cityTextBox', type: 'text' },
    adviserProvinceState:{ id: 'ContentPlaceHolder1_adviserDetails_addressContactDetails_address_provinceStateTextBox', type: 'text' },
    adviserPostalCode:   { id: 'ContentPlaceHolder1_adviserDetails_addressContactDetails_address_postalCodeTextBox', type: 'text' },
    adviserPhone:        { id: 'ContentPlaceHolder1_adviserDetails_addressContactDetails_contactDetails_phoneNumberTextBox', type: 'text' },
    adviserPhoneDdi:     { id: 'ContentPlaceHolder1_adviserDetails_addressContactDetails_contactDetails_phoneNumberNightTextBox', type: 'text' },
    adviserPhoneMobile:  { id: 'ContentPlaceHolder1_adviserDetails_addressContactDetails_contactDetails_phoneNumberMobileTextBox', type: 'text' },
    adviserFax:          { id: 'ContentPlaceHolder1_adviserDetails_addressContactDetails_contactDetails_faxNumberTextbox', type: 'text' },
    adviserEmail:        { id: 'ContentPlaceHolder1_adviserDetails_addressContactDetails_contactDetails_emailAddressTextBox', type: 'text' },
    intendedTravelDate:  { id: 'ContentPlaceHolder1_offshoreDetails_intendedTravelDateDatePicker_DatePicker', type: 'datepicker' },
    whenInNz:            { id: 'ContentPlaceHolder1_offshoreDetails_whenInNZDatePicker_DatePicker', type: 'datepicker' },
  };

  // Dropdown fields: field key -> select element ID
  const SELECT_MAP = {
    title:         'ContentPlaceHolder1_personDetails_titleDropDownList',
    gender:        'ContentPlaceHolder1_personDetails_genderDropDownList',
    countryOfBirth:'ContentPlaceHolder1_personDetails_CountryDropDownList',
    country:       'ContentPlaceHolder1_addressContactDetails_address_countryDropDownList',
    hasAgent:      'ContentPlaceHolder1_hasAgent_representedByAgentDropdownlist',
    hasCreditCard: 'ContentPlaceHolder1_hasCreditCard_hasCreditCardDropDownlist',
    secondIdType:  'ContentPlaceHolder1_identification_otherIdentificationDropdownlist',
    renalDialysis: 'ContentPlaceHolder1_medicalConditions_renalDialysisDropDownList',
    tuberculosis:  'ContentPlaceHolder1_medicalConditions_tuberculosisDropDownList',
    cancer:        'ContentPlaceHolder1_medicalConditions_cancerDropDownList',
    heartDisease:  'ContentPlaceHolder1_medicalConditions_heartDiseaseDropDownList',
    disability:    'ContentPlaceHolder1_medicalConditions_disabilityDropDownList',
    hospitalisation:'ContentPlaceHolder1_medicalConditions_hospitalisationDropDownList',
    residentialCare:'ContentPlaceHolder1_medicalConditions_residentailCareDropDownList',
    tbRisk:        'ContentPlaceHolder1_medicalConditions_tbRiskDropDownList',
    imprisonment5Years:'ContentPlaceHolder1_character_imprisonment5YearsDropDownList',
    imprisonment12Months:'ContentPlaceHolder1_character_imprisonment12MonthsDropDownList',
    deported:      'ContentPlaceHolder1_character_deportedDropDownList',
    deportedCountry:'ContentPlaceHolder1_character_countryDropDownList',
    charged:       'ContentPlaceHolder1_character_chargedDropDownList',
    convicted:     'ContentPlaceHolder1_character_convictedDropDownList',
    underInvestigation:'ContentPlaceHolder1_character_underInvestigationDropDownList',
    excluded:      'ContentPlaceHolder1_character_excludedDropDownList',
    removed:       'ContentPlaceHolder1_character_removedDropDownList',
    adviserType:   'ContentPlaceHolder1_adviserDetails_adviserTypeListControl',
    adviserActOnBehalf:'ContentPlaceHolder1_adviserDetails_actOnBehalfDropDownList',
    adviserOrdinarilyResident:'ContentPlaceHolder1_adviserDetails_ordinarilyResidentInNewZealandDropDownList',
    previousWhsVisa: 'ContentPlaceHolder1_offshoreDetails_commonWHSQuestions_previousWhsPermitVisaDropDownList',
    sufficientFunds: 'ContentPlaceHolder1_offshoreDetails_commonWHSQuestions_sufficientFundsHolidayDropDownList',
    beenToNz:        'ContentPlaceHolder1_offshoreDetails_beenToNzDropDownList',
    sufficientFundsTicket:'ContentPlaceHolder1_offshoreDetails_requirementsQuestions_sufficientFundsOnwardTicketDropDownList',
    meetsRequirements:'ContentPlaceHolder1_offshoreDetails_requirementsQuestions_readRequirementsDropDownList',
  };

  function getEl(id) {
    return document.getElementById(id);
  }

  // Fill a text/email input
  function fillTextInput(fieldKey, value, info) {
    if (!value) return 0;
    const el = getEl(info.id);
    if (!el) return 0;
    if (el.value === value) return 0;

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, 'value'
    ).set;
    nativeInputValueSetter.call(el, value);

    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return 1;
  }

  // Fill a textarea
  function fillTextarea(fieldKey, value, info) {
    if (!value) return 0;
    const el = getEl(info.id);
    if (!el) return 0;
    if (el.value === value) return 0;

    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return 1;
  }

  // Fill a select2 dropdown
  function fillSelect2(fieldKey, value, selectId) {
    if (!value) return 0;
    const select = getEl(selectId);
    if (!select) return 0;

    // Check if already set correctly
    if (select.value === value) return 0;

    // Set the underlying select value
    select.value = value;
    select.dispatchEvent(new Event('change', { bubbles: true }));

    // Also trigger select2 if present
    if (window.jQuery) {
      try {
        window.jQuery(select).trigger('change');
        window.jQuery(select).trigger('select2:select');
      } catch (e) {
        // select2 not available or error
      }
    }
    return 1;
  }

  // Fill datepicker field
  function fillDatepicker(fieldKey, value, info) {
    if (!value) return 0;
    const el = getEl(info.id);
    if (!el) return 0;
    if (el.value === value) return 0;

    // Set value via native setter to trigger jQuery UI datepicker binding
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, 'value'
    ).set;
    nativeInputValueSetter.call(el, value);

    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));

    // If jQuery datepicker is present, trigger it
    if (window.jQuery && window.jQuery.ui) {
      try {
        window.jQuery(el).datepicker('setDate', value);
      } catch (e) {
        // fallback: already set above
      }
    }
    return 1;
  }

  function fillAll(data) {
    let count = 0;

    Object.entries(FIELD_MAP).forEach(([key, info]) => {
      if (data[key] !== undefined && data[key] !== '') {
        if (info.type === 'datepicker') {
          count += fillDatepicker(key, data[key], info);
        } else if (info.type === 'textarea') {
          count += fillTextarea(key, data[key], info);
        } else {
          count += fillTextInput(key, data[key], info);
        }
      }
    });

    // Fill select2 dropdowns
    Object.entries(SELECT_MAP).forEach(([key, selectId]) => {
      if (data[key] !== undefined && data[key] !== '') {
        count += fillSelect2(key, data[key], selectId);
      }
    });

    // Handle title = "Other" -> ensure "Other" is selected and otherTitle is set
    if (data.title === '6' && data.otherTitle) {
      const otherTitleEl = getEl(FIELD_MAP.otherTitle.id);
      if (otherTitleEl && otherTitleEl.value !== data.otherTitle) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype, 'value'
        ).set;
        nativeInputValueSetter.call(otherTitleEl, data.otherTitle);
        otherTitleEl.dispatchEvent(new Event('input', { bubbles: true }));
        otherTitleEl.dispatchEvent(new Event('change', { bubbles: true }));
        count++;
      }
    }

    return count;
  }

  // Listen for fill requests from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fillForm') {
      const filled = fillAll(request.data);
      sendResponse({ success: true, fieldsFilled: filled });
    }
    return true; // keep channel open for async response
  });

})();
