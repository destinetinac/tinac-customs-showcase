import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return <div className="site-container"><header className="site-header"><Link to="/" className="wordmark" aria-label="Tinac Customs home"><svg className="brand-mark" viewBox="0 0 40 36" fill="none" aria-hidden="true"><path d="M4 5H36L33 11H23L14 31H7L16 11H1L4 5Z" fill="currentColor"/><path d="M28 16H36L30 31H17L20 25H25L28 16Z" fill="currentColor"/></svg><div className="brand-name">Tinac<br /><span>Customs</span></div></Link><nav className="header-nav" aria-label="Main navigation"><Button asChild variant="ghost" className="nav-link"><Link to="/" activeProps={{className:"nav-active"}} activeOptions={{exact:true}}>Inventory</Link></Button><Button asChild variant="ghost" className="nav-link"><Link to="/tuning" activeProps={{className:"nav-active"}}>Tuning <span className="nav-dot" /></Link></Button></nav></header></div>;
}

export function SiteFooter() {
  return <div className="site-container"><footer className="site-footer"><span className="footer-brand">Tinac Customs</span><p>© {new Date().getFullYear()} Tinac Customs.<br />All rights reserved.</p></footer></div>;
}
