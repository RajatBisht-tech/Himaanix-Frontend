import InformationalPage from "./InformationalPage.jsx";

export default function PrivacyPolicy() {
    return (
        <InformationalPage
            eyebrow="Your privacy"
            title="Privacy policy."
            intro="We respect your privacy. This policy explains, in plain language, how information may be used when you browse or shop with Himaanix."
            sections={[
                {
                    title: "Information you share",
                    paragraphs: [
                        "When you place an order, create an account, or contact us, you may provide details such as your name, email address, phone number, delivery address, and order information.",
                        "Payment details are handled by the payment service used at checkout. We do not ask you to send full card or banking credentials by email or phone.",
                    ],
                },
                {
                    title: "How information is used",
                    paragraphs: [
                        "We use relevant information to process and deliver orders, provide customer support, maintain account features, and improve the shopping experience.",
                        "We may send service messages about an order or account. You can choose whether to receive promotional email updates.",
                    ],
                },
                {
                    title: "Your choices and questions",
                    paragraphs: [
                        "You can contact us to ask about the personal information associated with your account or to request help with your preferences. Some information may need to be retained where required for order records or legal obligations.",
                        "For privacy questions, email himaanixtrading@gmail.com.",
                    ],
                },
            ]}
        />
    );
}