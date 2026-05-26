import { PUBLIC_WEB3FORMS_ACCESS_KEY } from "$env/static/public";

export interface ContactPayload {
    name: string;
    email: string;
    message: string;
    serviceType?: string;
}

/**
 * Sends contact form data to the Web3Forms API.
 */
export async function sendContactEmail(payload: ContactPayload): Promise<{ success: boolean; message: string }> {
    try {
        // Basic validation
        if (!payload.name.trim() || !payload.email.trim() || !payload.message.trim()) {
            return { success: false, message: "Required fields are missing." };
        }

        // Email regex pattern check
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(payload.email)) {
            return { success: false, message: "Please enter a valid email address." };
        }

        const accessKey = PUBLIC_WEB3FORMS_ACCESS_KEY;
        if (!accessKey) {
            return { success: false, message: "Web3Forms Access Key is not configured." };
        }

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                access_key: accessKey,
                name: payload.name,
                email: payload.email,
                message: payload.message,
                service_type: payload.serviceType,
                subject: `New Collaboration Inquiry - ${payload.name}`
            })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            return {
                success: true,
                message: "Thank you. Your message has been sent successfully."
            };
        } else {
            return {
                success: false,
                message: result.message || "Form submission failed. Please try again."
            };
        }
    } catch (error) {
        console.error("Network error delivering email via Web3Forms:", error);
        return {
            success: false,
            message: "Unable to process the request. Please try again later."
        };
    }
}