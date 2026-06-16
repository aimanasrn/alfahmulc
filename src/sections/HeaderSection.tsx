import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { navigationIds } from "../data/landingPage";
import { buttonVariants } from "../components/ui/Button";
import { LanguageSwitcher } from "../components/ui/LanguageSwitcher";
import { cn } from "../utils/cn";

export function HeaderSection() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = navigationIds.map((id) => ({ id, label: t(`nav.${id}`) }));

  return (
    <header className={cn("site-header", isScrolled && "is-scrolled")}>
      <div className="container site-header__inner">
        <a className="site-brand" href="#home">
          <span className="site-brand__mark">AF</span>
          <span className="site-brand__text">
            <strong>{t("brand.name")}</strong>
            <small>{t("brand.tagline")}</small>
          </span>
        </a>

        <nav aria-label="Primary navigation" className="site-nav">
          {links.map((link) => (
            <a key={link.id} className="site-nav__link" href={`#${link.id}`}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <LanguageSwitcher />
          <a className={cn(buttonVariants("primary"), "site-header__cta")} href="#contact">
            {t("cta.enrollNow")}
          </a>
          <button
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            className="menu-toggle"
            onClick={() => setIsMenuOpen((value) => !value)}
            type="button"
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className={cn("mobile-drawer", isMenuOpen && "is-open")}>
        <div className="container mobile-drawer__content">
          {links.map((link) => (
            <a
              key={link.id}
              className="mobile-drawer__link"
              href={`#${link.id}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a className={buttonVariants("primary")} href="#contact" onClick={() => setIsMenuOpen(false)}>
            {t("cta.enrollNow")}
          </a>
        </div>
      </div>
    </header>
  );
}
