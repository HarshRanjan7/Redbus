/* Coded by Harsh Ranjan */

document.addEventListener('DOMContentLoaded', () => {
    // --- Coupon Code Copy Functionality ---
    const copyIcons = document.querySelectorAll('.offer-card__copy-icon'); // Updated selector
    copyIcons.forEach(icon => {
        icon.addEventListener('click', (event) => {
            const couponTextElement = event.target.previousElementSibling; // The <span> with the code
            if (couponTextElement) {
                const couponCode = couponTextElement.textContent;
                
                // Use the deprecated document.execCommand for better iframe compatibility
                const textarea = document.createElement('textarea');
                textarea.value = couponCode;
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    document.execCommand('copy');
                    // Optional: Provide visual feedback to the user
                    const originalText = couponTextElement.textContent;
                    couponTextElement.textContent = 'Copied!';
                    setTimeout(() => {
                        couponTextElement.textContent = originalText;
                    }, 1500);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    // Fallback for browsers where execCommand might not work or is disabled
                    alert('Please manually copy the code: ' + couponCode);
                }
                document.body.removeChild(textarea);
            }
        });
    });

    // --- Service Tabs Functionality (Cab/Bus Rental vs. Train Tickets) ---
    const serviceTabs = document.querySelectorAll('.service-tabs__item'); // Updated selector
    const serviceDetails = document.querySelectorAll('.service-details__content'); // Updated selector

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove 'active' class from all tabs and hide all details
            serviceTabs.forEach(t => t.classList.remove('active'));
            serviceDetails.forEach(d => d.classList.remove('active-service')); // Updated class name

            // Add 'active' class to the clicked tab
            tab.classList.add('active');

            // Show the corresponding service details
            const serviceType = tab.dataset.service; // Get data-service attribute
            const activeDetail = document.querySelector(`.service-details__content.${serviceType}-details`); // Updated selector
            if (activeDetail) {
                activeDetail.classList.add('active-service'); // Updated class name
            }
        });
    });

    // --- FAQ Accordion Functionality ---
    const accordionHeaders = document.querySelectorAll('.accordion-item__header'); // Updated selector

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion-item'); // Updated selector
            const accordionContent = accordionItem.querySelector('.accordion-item__content'); // Updated selector

            // Toggle 'active' class on the accordion item
            accordionItem.classList.toggle('active');

            // Toggle max-height for smooth expand/collapse
            if (accordionItem.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            } else {
                accordionContent.style.maxHeight = "0";
            }
        });
    });

    // --- FAQ Tab Switching Functionality ---
    const faqCategoryTabs = document.querySelectorAll('.faq-section__tabs .faq-section__tab-item'); // Updated selector
    const allAccordionItems = document.querySelectorAll('.accordion-item'); // Updated selector

    faqCategoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove 'active' from all category tabs
            faqCategoryTabs.forEach(t => t.classList.remove('active'));
            // Add 'active' to the clicked tab
            tab.classList.add('active');

            const selectedCategory = tab.dataset.faqCategory;

            // Hide all accordion items first
            allAccordionItems.forEach(item => {
                item.style.display = 'none';
                item.classList.remove('active'); // Ensure content is collapsed when hidden
                item.querySelector('.accordion-item__content').style.maxHeight = '0'; // Updated selector
            });

            // Show only items matching the selected category
            document.querySelectorAll(`.accordion-item[data-faq-category="${selectedCategory}"]`).forEach(item => { // Updated selector
                item.style.display = 'block';
            });
        });
    });

    // Initialize the first FAQ tab as active and show its content
    if (faqCategoryTabs.length > 0) {
        faqCategoryTabs[0].click(); // Simulate click on the first tab
    }


    // --- Scroll to Top Button Functionality ---
    const scrollTopButton = document.querySelector('.scroll-to-top-button'); // Updated selector

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            scrollTopButton.classList.add('show');
        } else {
            scrollTopButton.classList.remove('show');
        }
    });

    // Smooth scroll to top when button is clicked (already handled by href="#header")
    // but adding a JS listener for extra smoothness if needed
    scrollTopButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default jump
        document.getElementById('header').scrollIntoView({ // Updated ID
            behavior: 'smooth'
        });
    });

    // --- Set default date for date input to today ---
    const dateInput = document.getElementById('date_input');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.value = `${yyyy}-${mm}-${dd}`;
    }
});
