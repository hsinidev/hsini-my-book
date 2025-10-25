
import React from 'react';
import { StaticPage } from '../types';

interface StaticViewProps {
    page: StaticPage;
}

const pageContent: Record<StaticPage, { title: string; content: React.ReactNode }> = {
    'about': {
        title: 'About Us',
        content: (
            <>
                <p>Welcome to mylibrarybook.com, your personal gateway to the vast world of literature. Our mission is to make books accessible and discoverable for everyone, everywhere.</p>
                <p>We leverage the extensive catalog of the Open Library to provide you with details on millions of books. Whether you're searching for a classic novel, a new trending author, or books on a specific subject, our platform is designed to help you find what you're looking for.</p>
                <p>This is a passion project dedicated to the love of reading. We hope you enjoy your journey through the endless shelves of our digital library.</p>
            </>
        )
    },
    'contact': {
        title: 'Contact Us',
        content: (
            <>
                <p>We'd love to hear from you! If you have any questions, feedback, or suggestions, please don't hesitate to reach out.</p>
                <p>You can contact us via email at: <a href="mailto:contact@mylibirarybook.com" className="text-blue-600 hover:underline">contact@mylibirarybook.com</a>.</p>
                <p>We do our best to respond to all inquiries as quickly as possible.</p>
            </>
        )
    },
    'for-parents': {
        title: 'For Parents',
        content: (
            <>
                <p>mylibrarybook.com is designed to be a family-friendly resource for discovering books. We understand the importance of providing a safe online environment for children.</p>
                <p>Our platform accesses book data from the Open Library public API. While the catalog is vast, we do not generate or host content ourselves. The "Read Book" links direct to the Internet Archive (archive.org), which has its own content policies.</p>
                <p>We encourage parents to supervise their children's online activities and explore the world of books together. If you find any book or information that you believe is inappropriate, please contact us so we can investigate.</p>
            </>
        )
    },
    'privacy': {
        title: 'Privacy Policy',
        content: (
            <>
                <p>Your privacy is important to us. This Privacy Policy explains how mylibrarybook.com handles your information.</p>
                <h3 className="text-xl font-bold mt-4 mb-2">Information We Collect</h3>
                <p>mylibrarybook.com is a client-side application. We do not have a database and we do not collect or store any personal information from our users. We do not use cookies or tracking technologies to personally identify you.</p>
                <h3 className="text-xl font-bold mt-4 mb-2">Third-Party Services</h3>
                <p>We interact with the Open Library API (openlibrary.org) to fetch book data. Your search queries are sent to their servers to provide you with results. We encourage you to review their privacy policy. Links to "Read Book" direct you to the Internet Archive (archive.org), which is also a separate service with its own privacy policy.</p>
                <h3 className="text-xl font-bold mt-4 mb-2">Changes to This Policy</h3>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Last updated: October 26, 2025.</p>
            </>
        )
    },
    'terms': {
        title: 'Terms of Service',
        content: (
            <>
                <p>By accessing and using mylibrarybook.com, you agree to comply with and be bound by the following terms and conditions of use.</p>
                <h3 className="text-xl font-bold mt-4 mb-2">Use of the Service</h3>
                <p>Our service is provided "as is" for your personal, non-commercial use. The book data is provided by the Open Library and we do not guarantee its accuracy or completeness. The "Read Book" feature links to external sites (Internet Archive), and we are not responsible for their content or availability.</p>
                <h3 className="text-xl font-bold mt-4 mb-2">Intellectual Property</h3>
                <p>The design and branding of mylibrarybook.com are our property. All book covers, titles, and author information are the property of their respective copyright holders.</p>
                <h3 className="text-xl font-bold mt-4 mb-2">Limitation of Liability</h3>
                <p>mylibrarybook.com will not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service.</p>
            </>
        )
    },
    'dmca': {
        title: 'DMCA Notice',
        content: (
             <>
                <p>mylibrarybook.com respects the intellectual property rights of others. We do not host any book content ourselves. All book data is sourced from the Open Library API, and reading links direct to the Internet Archive.</p>
                <p>If you believe that your copyrighted work has been made available on a third-party site linked through our service in a way that constitutes copyright infringement, please submit a DMCA takedown notice directly to the hosting service (e.g., the Internet Archive).</p>
                <p>If you believe that information displayed on our site (such as a book cover or description) infringes on your copyright, please provide us with the following information:</p>
                <ul className="list-disc list-inside space-y-2 my-4">
                    <li>A physical or electronic signature of the copyright owner or a person authorized to act on their behalf.</li>
                    <li>Identification of the copyrighted work claimed to have been infringed.</li>
                    <li>Identification of the material that is claimed to be infringing and where it is located on our service.</li>
                    <li>Your contact information, including your address, telephone number, and an email address.</li>
                    <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                    <li>A statement that the information in the notification is accurate, and, under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</li>
                </ul>
                <p>Please send this information to <a href="mailto:contact@mylibirarybook.com" className="text-blue-600 hover:underline">contact@mylibirarybook.com</a>.</p>
            </>
        )
    }
};

export const StaticView: React.FC<StaticViewProps> = ({ page }) => {
    const { title, content } = pageContent[page];

    return (
        <div className="bg-white p-6 sm:p-10 rounded-lg shadow-md max-w-4xl mx-auto my-8">
            <h1 className="font-lora text-4xl font-bold mb-6 pb-4 border-b">{title}</h1>
            <div className="prose max-w-none prose-p:mb-4 prose-a:text-blue-600">
                {content}
            </div>
        </div>
    );
};
