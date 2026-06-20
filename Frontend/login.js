/**
 * Uber Login Page Clone - Core Logic
 * Now with real OTP email sending via backend API
 */

document.addEventListener('DOMContentLoaded', () => {
    // Backend API base URL
    const API_BASE = 'http://localhost:3000/api';

    // DOM View Elements
    const views = {
        login: document.getElementById('login-view'),
        otp: document.getElementById('otp-view'),
        qr: document.getElementById('qr-view'),
        success: document.getElementById('success-view')
    };

    // Modal Elements
    const oauthModal = document.getElementById('oauth-modal');
    const oauthTitle = document.getElementById('oauth-title');
    const oauthSvgHolder = document.getElementById('oauth-svg-holder');
    const oauthAccounts = document.getElementById('oauth-accounts');
    const oauthCustomForm = document.getElementById('oauth-custom-form');
    const oauthLoading = document.getElementById('oauth-loading');
    const oauthCustomEmail = document.getElementById('oauth-custom-email');
    const btnOauthSubmit = document.getElementById('btn-oauth-submit');
    const oauthClose = document.getElementById('oauth-close');
    const btnGoogle = document.getElementById('btn-google');
    const btnApple = document.getElementById('btn-apple');
    const btnOauthCustom = document.getElementById('btn-oauth-custom');

    // Form inputs and buttons
    const loginForm = document.getElementById('login-form');
    const phoneEmailInput = document.getElementById('phone-email');
    const inputContainer = document.getElementById('input-container');
    const errorBanner = document.getElementById('error-banner');
    const errorMessageText = document.getElementById('error-message');
    const userDisplayId = document.getElementById('user-display-id');
    const btnContinue = document.getElementById('btn-continue');
    
    // OTP specific elements
    const otpInputs = document.querySelectorAll('.otp-input');
    const otpErrorBanner = document.getElementById('otp-error-banner');
    const otpErrorMessage = otpErrorBanner.querySelector('span');
    const otpTimerText = document.getElementById('otp-timer-text');
    const otpTimerVal = document.getElementById('otp-timer-val');
    const otpResendBtn = document.getElementById('otp-resend');
    const btnOtpBack = document.getElementById('otp-back');

    // QR specific elements
    const btnQr = document.getElementById('btn-qr');
    const btnQrBack = document.getElementById('qr-back');
    const qrStatusText = document.querySelector('.qr-status-indicator span:last-child');
    const qrLaser = document.querySelector('.qr-laser-line');
    const qrCode = document.querySelector('.qr-code-svg');

    // Header logo back-button
    const logoButton = document.getElementById('logo-button');

    // Success elements
    const successMsgText = document.getElementById('success-message-text');
    const btnDashboard = document.getElementById('btn-dashboard-mock');

    // Local state variables
    let otpCountdownInterval = null;
    let qrScanTimeout = null;
    let oauthTimeout = null;
    let currentEmail = ''; // Stores the email for OTP verification

    // SVG graphics for OAuth modal header
    const googleSvg = `<svg viewBox="0 0 24 24" width="32" height="32">
        <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.96 5.96 0 0 1 8.07 12.56a5.96 5.96 0 0 1 5.92-5.956c1.616 0 3.085.614 4.228 1.623l3.05-3.048A10.137 10.137 0 0 0 13.99 2.22C8.243 2.22 3.58 6.848 3.58 12.56c0 5.71 4.663 10.34 10.41 10.34 5.998 0 9.98-4.215 9.98-10.16 0-.614-.055-1.205-.156-1.776H12.24Z"/>
        <path fill="#4285F4" d="M23.814 10.925c-.01-.358-.04-.716-.09-1.07H12.24v4.114h6.887c-.286 1.488-1.127 2.766-2.38 3.61l3.693 2.865c2.16-1.992 3.374-4.928 3.374-8.52Z"/>
        <path fill="#FBBC05" d="M6.35 15.023A5.963 5.963 0 0 1 5.92 12.56c0-.877.164-1.716.43-2.497l-3.79-2.937a10.176 10.176 0 0 0-.02 10.871l3.81-3.027c-.22-.303-.434-.637-.62-1.047Z"/>
        <path fill="#34A853" d="M13.99 22.9c2.72 0 5.01-.902 6.685-2.434l-3.693-2.865c-1.02.684-2.327 1.096-3.878 1.096-2.986 0-5.518-2.022-6.42-4.743l-3.81 3.027C4.697 20.316 9.027 22.9 13.99 22.9Z"/>
    </svg>`;

    const appleSvg = `<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94 1.07.08 2.15-.52 2.81-1.33z"/>
    </svg>`;

    /* ==========================================================================
       Utility Functions
       ========================================================================== */

    // Switch view helper
    function switchView(targetView) {
        // Clear timers/timeouts when leaving views
        clearInterval(otpCountdownInterval);
        clearTimeout(qrScanTimeout);
        clearTimeout(oauthTimeout);
        
        // Hide all views
        Object.keys(views).forEach(key => {
            views[key].classList.remove('active');
        });

        // Show target view
        views[targetView].classList.add('active');

        // Optional focus / reset tasks
        if (targetView === 'login') {
            phoneEmailInput.focus();
            errorBanner.classList.remove('active');
            inputContainer.classList.remove('shake');
            setBtnLoading(btnContinue, false, 'Continue');
        } else if (targetView === 'otp') {
            otpInputs.forEach(input => input.value = '');
            otpErrorBanner.classList.remove('active');
            otpInputs[0].focus();
        } else if (targetView === 'qr') {
            qrStatusText.textContent = "Waiting for scan...";
            qrLaser.style.display = "block";
            qrCode.style.opacity = "1";
            simulateQRScan();
        }
    }

    // Email/Phone Form Validation
    function validateLoginInput(input) {
        input = input.trim();
        if (!input) {
            return { isValid: false, message: 'Please enter a phone number or email.' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;

        const isEmail = emailRegex.test(input);
        const isPhone = phoneRegex.test(input);

        if (isEmail) {
            return { isValid: true, type: 'email' };
        }
        if (isPhone) {
            return { isValid: true, type: 'phone' };
        }

        return { isValid: false, message: 'Enter a valid email address or phone number.' };
    }

    // Trigger input error state
    function showError(message) {
        errorMessageText.textContent = message;
        errorBanner.classList.add('active');
        inputContainer.classList.add('shake');
        
        setTimeout(() => {
            inputContainer.classList.remove('shake');
        }, 300);
    }

    // Button loading state helper
    function setBtnLoading(btn, isLoading, originalText) {
        if (isLoading) {
            btn.disabled = true;
            btn.dataset.originalText = btn.textContent;
            btn.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:2px;margin:0;"></div>';
        } else {
            btn.disabled = false;
            btn.textContent = originalText || btn.dataset.originalText || 'Continue';
        }
    }

    /* ==========================================================================
       Flow 1: Login Form Submission — Sends real OTP email
       ========================================================================== */

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const inputValue = phoneEmailInput.value.trim();
        const validation = validateLoginInput(inputValue);

        if (!validation.isValid) {
            showError(validation.message);
            return;
        }

        if (validation.type === 'phone') {
            // For phone numbers, we can't send email OTP — show a helpful message
            showError('OTP via SMS is not supported in this demo. Please enter an email address to receive the OTP.');
            return;
        }

        // Valid email — send OTP via backend
        errorBanner.classList.remove('active');
        setBtnLoading(btnContinue, true);
        currentEmail = inputValue;

        try {
            const response = await fetch(`${API_BASE}/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: currentEmail })
            });

            const data = await response.json();

            if (data.success) {
                userDisplayId.textContent = currentEmail;
                switchView('otp');
                startOtpTimer();
            } else {
                showError(data.message || 'Failed to send OTP. Please try again.');
            }
        } catch (err) {
            console.error('Send OTP error:', err);
            showError('Could not connect to the server. Make sure the backend is running (npm start).');
        } finally {
            setBtnLoading(btnContinue, false, 'Continue');
        }
    });

    // Clear error border when user types
    phoneEmailInput.addEventListener('input', () => {
        if (errorBanner.classList.contains('active')) {
            errorBanner.classList.remove('active');
        }
    });

    /* ==========================================================================
       Flow 2: OTP Verification Screen — Verifies against real backend
       ========================================================================== */

    // Auto-focus next field and handle keys
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            e.target.value = value.replace(/[^0-9]/g, '');

            if (e.target.value && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }

            checkOtpComplete();
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                if (!input.value && index > 0) {
                    otpInputs[index - 1].value = '';
                    otpInputs[index - 1].focus();
                } else {
                    input.value = '';
                }
                otpErrorBanner.classList.remove('active');
            } else if (e.key === 'ArrowLeft' && index > 0) {
                otpInputs[index - 1].focus();
            } else if (e.key === 'ArrowRight' && index < otpInputs.length - 1) {
                otpInputs[index + 1].focus();
            }
        });

        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pasteData = (e.clipboardData || window.clipboardData).getData('text');
            const cleanDigits = pasteData.replace(/[^0-9]/g, '').slice(0, 4);

            if (cleanDigits.length > 0) {
                for (let i = 0; i < cleanDigits.length; i++) {
                    if (otpInputs[i]) {
                        otpInputs[i].value = cleanDigits[i];
                    }
                }
                const nextFocusIndex = Math.min(cleanDigits.length, otpInputs.length - 1);
                otpInputs[nextFocusIndex].focus();
                checkOtpComplete();
            }
        });
    });

    // Check if all OTP inputs are filled — verify against backend
    async function checkOtpComplete() {
        const otpCode = Array.from(otpInputs).map(input => input.value).join('');
        
        if (otpCode.length === otpInputs.length) {
            otpInputs.forEach(input => {
                input.blur();
                input.disabled = true;
            });

            try {
                const response = await fetch(`${API_BASE}/verify-otp`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: currentEmail, otp: otpCode })
                });

                const data = await response.json();

                if (data.success) {
                    // ✅ OTP verified!
                    otpInputs.forEach(input => {
                        input.style.borderColor = 'var(--uber-success)';
                        input.style.backgroundColor = 'var(--uber-success-bg)';
                    });
                    
                    setTimeout(() => {
                        successMsgText.textContent = `You have successfully logged in with ${currentEmail}.`;
                        switchView('success');
                        otpInputs.forEach(input => {
                            input.disabled = false;
                            input.removeAttribute('style');
                        });
                    }, 600);
                } else {
                    // ❌ Wrong OTP
                    otpErrorMessage.textContent = data.message || 'Invalid code. Please try again.';
                    otpErrorBanner.classList.add('active');
                    otpInputs.forEach(input => {
                        input.value = '';
                        input.disabled = false;
                        input.style.borderColor = 'var(--uber-error)';
                    });
                    otpInputs[0].focus();
                    setTimeout(() => {
                        otpInputs.forEach(input => input.removeAttribute('style'));
                    }, 1000);
                }
            } catch (err) {
                console.error('Verify OTP error:', err);
                otpErrorMessage.textContent = 'Server error. Please try again.';
                otpErrorBanner.classList.add('active');
                otpInputs.forEach(input => {
                    input.value = '';
                    input.disabled = false;
                });
                otpInputs[0].focus();
            }
        }
    }

    // OTP Timer Logic
    function startOtpTimer() {
        clearInterval(otpCountdownInterval);
        let secondsLeft = 30;
        otpTimerVal.textContent = secondsLeft;
        otpTimerText.style.display = 'inline';
        otpResendBtn.disabled = true;

        otpCountdownInterval = setInterval(() => {
            secondsLeft--;
            otpTimerVal.textContent = secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(otpCountdownInterval);
                otpTimerText.style.display = 'none';
                otpResendBtn.disabled = false;
            }
        }, 1000);
    }

    // Back to Login View
    btnOtpBack.addEventListener('click', () => {
        switchView('login');
    });

    // Resend OTP action — sends a new real OTP email
    otpResendBtn.addEventListener('click', async () => {
        otpResendBtn.disabled = true;
        otpErrorBanner.classList.remove('active');

        try {
            const response = await fetch(`${API_BASE}/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: currentEmail })
            });

            const data = await response.json();

            // Show success notification
            const alertBanner = document.createElement('div');
            alertBanner.className = 'error-banner';
            alertBanner.style.display = 'flex';
            alertBanner.style.marginTop = '0px';
            alertBanner.style.marginBottom = '12px';
            
            if (data.success) {
                alertBanner.style.borderColor = 'var(--uber-success)';
                alertBanner.style.color = 'var(--uber-success)';
                alertBanner.style.backgroundColor = 'var(--uber-success-bg)';
                alertBanner.innerHTML = `
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>A new verification code has been sent to ${currentEmail}.</span>
                `;
            } else {
                alertBanner.innerHTML = `
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span>${data.message || 'Failed to resend code.'}</span>
                `;
            }

            const parent = views.otp;
            const container = document.querySelector('.otp-container');
            parent.insertBefore(alertBanner, container);

            setTimeout(() => alertBanner.remove(), 4000);

        } catch (err) {
            console.error('Resend OTP error:', err);
        }

        startOtpTimer();
    });


    /* ==========================================================================
       Flow 3: QR Code login Screen (still simulated)
       ========================================================================== */

    btnQr.addEventListener('click', () => {
        switchView('qr');
    });

    btnQrBack.addEventListener('click', () => {
        switchView('login');
    });

    function simulateQRScan() {
        qrScanTimeout = setTimeout(() => {
            qrStatusText.textContent = "QR Code detected! Authenticating...";
            qrLaser.style.display = "none";
            qrCode.style.opacity = "0.3";

            qrScanTimeout = setTimeout(() => {
                successMsgText.textContent = "Logged in securely via QR code.";
                switchView('success');
            }, 1500);
        }, 3500);
    }

    /* ==========================================================================
       Flow 4: Google & Apple OAuth Simulated Modals
       ========================================================================== */

    function openOauthModal(provider) {
        oauthModal.classList.add('active');
        oauthAccounts.classList.remove('hidden');
        oauthCustomForm.classList.add('hidden');
        oauthLoading.classList.add('hidden');
        
        if (provider === 'google') {
            oauthTitle.textContent = "Sign in with Google";
            oauthSvgHolder.innerHTML = googleSvg;
        } else {
            oauthTitle.textContent = "Sign in with Apple";
            oauthSvgHolder.innerHTML = appleSvg;
        }
    }

    btnGoogle.addEventListener('click', () => openOauthModal('google'));
    btnApple.addEventListener('click', () => openOauthModal('apple'));

    oauthClose.addEventListener('click', () => {
        oauthModal.classList.remove('active');
        clearTimeout(oauthTimeout);
    });

    oauthModal.addEventListener('click', (e) => {
        if (e.target === oauthModal) {
            oauthModal.classList.remove('active');
            clearTimeout(oauthTimeout);
        }
    });

    document.querySelectorAll('.account-row[data-email]').forEach(row => {
        row.addEventListener('click', () => {
            const name = row.getAttribute('data-name');
            const email = row.getAttribute('data-email');
            triggerOauthLoading(name, email);
        });
    });

    btnOauthCustom.addEventListener('click', () => {
        oauthAccounts.classList.add('hidden');
        oauthCustomForm.classList.remove('hidden');
        oauthCustomEmail.focus();
    });

    btnOauthSubmit.addEventListener('click', () => {
        const email = oauthCustomEmail.value.trim();
        if (email && email.includes('@')) {
            triggerOauthLoading(email.split('@')[0], email);
        } else {
            oauthCustomEmail.style.borderColor = 'var(--uber-error)';
            setTimeout(() => oauthCustomEmail.style.borderColor = '', 1500);
        }
    });

    oauthCustomEmail.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnOauthSubmit.click();
        }
    });

    function triggerOauthLoading(name, email) {
        oauthAccounts.classList.add('hidden');
        oauthCustomForm.classList.add('hidden');
        oauthLoading.classList.remove('hidden');

        oauthTimeout = setTimeout(() => {
            oauthModal.classList.remove('active');
            successMsgText.textContent = `Authenticated successfully as ${name} (${email}).`;
            switchView('success');
        }, 2000);
    }


    /* ==========================================================================
       Home & Dashboard buttons
       ========================================================================== */

    logoButton.addEventListener('click', () => {
        switchView('login');
    });

    btnDashboard.addEventListener('click', () => {
        alert('Welcome! You have successfully completed the login flow. Returning to the login screen.');
        switchView('login');
        phoneEmailInput.value = '';
        currentEmail = '';
    });
});
