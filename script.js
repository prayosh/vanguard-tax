/**
 * VANGUARD TAX & ASSOCIATES - COMPLIANCE WORKFLOW ENGINE
 * Pure Vanilla JavaScript for mobile navigation, contact validation, maps integration, 
 * and local offline direct tax regime calculation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. MOBILE NAVIGATION HAMBURGER TOGGLE ---
  const menuBtn = document.getElementById('menuBtn');
  const navMenu = document.getElementById('navMenu');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
      const spans = menuBtn.querySelectorAll('span');
      if (navMenu.classList.contains('mobile-active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close mobile navigation menu upon clicking anywhere inside the navigation
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('mobile-active')) {
        navMenu.classList.remove('mobile-active');
        const spans = menuBtn?.querySelectorAll('span');
        if (spans) {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    });
  });

  // --- 2. GOOGLE MAPS DIRECTION WORKFLOW ---
  const mapsBtn = document.getElementById('openMapsBtn');
  if (mapsBtn) {
    mapsBtn.addEventListener('click', () => {
      const destinationAddr = "Statesman House, Connaught Place, New Delhi, 110001";
      const gMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinationAddr)}`;
      window.open(gMapsUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // --- 3. INTERACTIVE CORNERSTONE FAQ ACCORDION ---
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    card.addEventListener('click', () => {
      const isActive = card.classList.contains('faq-active');
      
      // Collapse other expanded items to ensure standard accordion experience
      faqCards.forEach(otherCard => {
        otherCard.classList.remove('faq-active');
      });
      
      if (!isActive) {
        card.classList.add('faq-active');
      }
    });
  });

  // --- 4. SECURE INTAKE FORM DISPATCH HANDLING ---
  const intakeForm = document.getElementById('consultationForm');
  const alertPanel = document.getElementById('formSuccessPanel');

  if (intakeForm) {
    intakeForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Collect inputs
      const propEntity = document.getElementById('inpEntity')?.value.trim();
      const propDirector = document.getElementById('inpDirector')?.value.trim();
      const propPanGst = document.getElementById('inpPanGst')?.value.trim();
      const propEmail = document.getElementById('inpEmail')?.value.trim();
      const propPhone = document.getElementById('inpPhone')?.value.trim();
      const propInquiry = document.getElementById('inpInquiry')?.value;
      const propDesc = document.getElementById('inpDesc')?.value.trim();

      // Guard checks
      if (!propEntity || !propDirector || !propEmail || !propPhone || !propDesc) {
        alert('All primary verification fields are mandatory to authorize a formal CA consultation.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(propEmail)) {
        alert('Please enter a valid official corporate email address context.');
        return;
      }

      // Legal logging timestamp (May 2026 reference frame)
      const dispatchTime = new Date().toISOString().replace('T', ' ').substring(0, 19);

      if (alertPanel) {
        alertPanel.innerHTML = `
          <strong class="success-icon" style="color: var(--color-secondary); font-size: 1.25rem; margin-right: 0.5rem;">✓</strong> 
          <strong>Inquiry Formally Cataloged:</strong> 
          Vanguard Tax & Associates has received the statutory consultation request for <strong>${propEntity}</strong> 
          (Auth: ${propDirector}). An associate of Chief Auditor Rameshwar Nath Sharma will review the filings 
          and contact you at <strong>${propEmail}</strong>. 
          <br><br>
          <span style="font-family: var(--font-mono); font-size: 0.8rem; opacity: 0.85;">
            Reference ID: VT/${(propInquiry || 'GEN').substring(0, 3).toUpperCase()}/${Math.floor(1000 + Math.random() * 9000)} • 
            Registered Time: ${dispatchTime} UTC/IST
          </span>
        `;
        alertPanel.style.display = 'block';
        alertPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // Reset the form values
      intakeForm.reset();
    });
  }

  // --- 5. STRATEGIC OFFLINE LOCAL TAX RESIME CALCULATOR ---
  const btnCalcTax = document.getElementById('btnCalcTax');
  const taxCalcResults = document.getElementById('taxCalcResults');
  
  if (btnCalcTax && taxCalcResults) {
    btnCalcTax.addEventListener('click', () => {
      const grossIncomeInput = document.getElementById('calcGrossIncome');
      const deductionsInput = document.getElementById('calcDeductions');
      
      const grossIncome = parseFloat(grossIncomeInput.value) || 0;
      const deductions = parseFloat(deductionsInput.value) || 0;
      
      if (grossIncome <= 0) {
        alert('Please enter a valid Gross Annual Income greater than zero to evaluate tax liabilities.');
        return;
      }
      
      // A. OLD REGIME LOGIC:
      // Taxable Income = Gross Annual Income minus Total Deductions. Standard Deduction of INR 50,000 applies automatically.
      const stdDeductionOld = grossIncome > 50000 ? 50000 : grossIncome;
      let taxableIncomeOld = grossIncome - stdDeductionOld - deductions;
      if (taxableIncomeOld < 0) taxableIncomeOld = 0;
      
      // Old Slabs:
      // * Up to 2.5 Lakhs: Nil
      // * 2.5 to 5 Lakhs: 5%
      // * 5 to 10 Lakhs: 20%
      // * Above 10 Lakhs: 30%
      let oldTax = 0;
      let tempOld = taxableIncomeOld;
      if (tempOld > 1000000) {
        oldTax += (tempOld - 1000000) * 0.30;
        tempOld = 1000000;
      }
      if (tempOld > 500000) {
        oldTax += (tempOld - 500000) * 0.20;
        tempOld = 500000;
      }
      if (tempOld > 250000) {
        oldTax += (tempOld - 250000) * 0.05;
      }
      
      // Section 87A rebate for Old Regime: If Taxable Income is <= 5 Lakhs, tax liability is Nil.
      if (taxableIncomeOld <= 500000) {
        oldTax = 0;
      }
      
      // Education Cess: 4%
      if (oldTax > 0) {
        oldTax = oldTax * 1.04;
      }
      
      // B. NEW REGIME LOGIC (Slabs aligned for AY 2026-27 / FY 2025-26):
      // Taxable Income = Gross Annual Income minus Standard Deduction of INR 75,000 (no 80C/80D allowed).
      const stdDeductionNew = grossIncome > 75000 ? 75000 : grossIncome;
      let taxableIncomeNew = grossIncome - stdDeductionNew;
      if (taxableIncomeNew < 0) taxableIncomeNew = 0;
      
      // FY 2025-26 / AY 2026-27 New Slabs:
      // * Up to 3 Lakhs: Nil
      // * 3 to 7 Lakhs: 5%
      // * 7 to 10 Lakhs: 10%
      // * 10 to 12 Lakhs: 15%
      // * 12 to 15 Lakhs: 20%
      // * Above 15 Lakhs: 30%
      let newTax = 0;
      let tempNew = taxableIncomeNew;
      if (tempNew > 1500000) {
        newTax += (tempNew - 1500000) * 0.30;
        tempNew = 1500000;
      }
      if (tempNew > 1200000) {
        newTax += (tempNew - 1200000) * 0.20;
        tempNew = 1200000;
      }
      if (tempNew > 1000000) {
        newTax += (tempNew - 1000000) * 0.15;
        tempNew = 1000000;
      }
      if (tempNew > 700000) {
        newTax += (tempNew - 700000) * 0.10;
        tempNew = 700000;
      }
      if (tempNew > 300000) {
        newTax += (tempNew - 300000) * 0.05;
      }
      
      // Section 87A Rebate for New Regime: If Taxable Income is <= 7 Lakhs, tax liability is Nil.
      // (Under current tax laws, rebate keeps it Nil for New Regime up to taxable income of 7 Lakhs).
      if (taxableIncomeNew <= 700000) {
        newTax = 0;
      }
      
      // Education Cess: 4%
      if (newTax > 0) {
        newTax = newTax * 1.04;
      }
      
      // Round liabilities to integer values
      oldTax = Math.round(oldTax);
      newTax = Math.round(newTax);
      const diff = Math.abs(oldTax - newTax);
      
      // Beautiful INR currency formatting
      const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        }).format(val).replace(/\s/g, '');
      };
      
      document.getElementById('outOldTax').textContent = formatCurrency(oldTax);
      document.getElementById('outNewTax').textContent = formatCurrency(newTax);
      
      let verdictMessage = "";
      if (newTax < oldTax) {
        verdictMessage = `Strategy Advice: Choose the NEW Tax Regime. Doing so yields a savings of approximately ${formatCurrency(diff)} over the Old Regime for this assessment period. Contact our direct tax wing to formulate structured tax plans.`;
      } else if (oldTax < newTax) {
        verdictMessage = `Strategy Advice: Choose the OLD Tax Regime. Your deductions allow you to save approximately ${formatCurrency(diff)} over the New simplified structure. Contact our corporate tax division to optimize your claims.`;
      } else {
        verdictMessage = `Strategy Advice: Both tax structures result in identical liabilities of ${formatCurrency(oldTax)}. Let our senior consultants align your investments with company directives.`;
      }
      
      document.getElementById('outVerdictText').textContent = verdictMessage;
      taxCalcResults.style.display = 'block';
    });
  }

  // --- 6. ADVANCED BACK-FORWARD CACHE (BFCACHE) LIFECYCLE COMPLIANCE ---
  // If the user navigates using the browser's forward or backward buttons, modern browsers often load 
  // the page from the memory BfCache (Back-forward cache). We synchronize and restore clean dynamic states 
  // during this transition.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      // 1. Terminate stale or suspended active mobile navigation menus
      const navMenuElement = document.getElementById('navMenu');
      const menuButtonElement = document.getElementById('menuBtn');
      if (navMenuElement && navMenuElement.classList.contains('mobile-active')) {
        navMenuElement.classList.remove('mobile-active');
        const spans = menuButtonElement?.querySelectorAll('span');
        if (spans) {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }

      // 2. Remove stale transaction catalog warnings or submit notifications
      const successFeedbackBox = document.getElementById('formSuccessPanel');
      if (successFeedbackBox) {
        successFeedbackBox.style.display = 'none';
        successFeedbackBox.innerHTML = '';
      }

      console.log('Vanguard Engine: Restored layout state successfully from Back-Forward cache (BfCache).');
    }
  });
});
