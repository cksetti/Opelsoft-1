export const metadata = {
  title: 'Contact Us',
  description: 'Questions about roles, hiring, or how OpelSoft works? Send us a message and our team will get back to you.',
  alternates: {
    canonical: '/contact-us',
  },
  openGraph: {
    title: 'Contact Us | OpelSoft',
    description: 'Questions about roles, hiring, or how OpelSoft works? Send us a message and our team will get back to you.',
    url: '/contact-us',
  }
};

export default function ContactLayout({ children }) {
  return <>{children}</>;
}
