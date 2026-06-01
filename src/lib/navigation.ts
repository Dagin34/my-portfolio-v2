export interface Navigation {
    id: string;
    label: string;
    href: string;
}

const navLinks: Navigation[] = [
    { id: "01", label: "Experience", href: "/#experience" },
    { id: "02", label: "Projects", href: "/projects" },
    { id: "03", label: "Services", href: "/#services" },
    { id: "04", label: "Skills", href: "/#skills" },
    { id: "05", label: "Contact", href: "/#contact" },
];

export default navLinks;