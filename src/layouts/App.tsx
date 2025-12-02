import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

const LG_QUERY = '(min-width: 1024px)';

export default function AppLayout() {
    const location = useLocation();

    const [isDesktop, setIsDesktop] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [desktopCollapsed, setDesktopCollapsed] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(LG_QUERY);
        const handler = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsDesktop(e.matches);
            if (e.matches) setMobileOpen(false);
        };
        handler(mql);
        const listener = (e: MediaQueryListEvent) => handler(e);
        mql.addEventListener?.('change', listener);
        return () => mql.removeEventListener?.('change', listener);
    }, []);

    useEffect(() => {
        // if (!isDesktop) setMobileOpen(false);
    }, [location.pathname, isDesktop]);

    return (
        <div className="app-shell">
            {!isDesktop && (
                <div
                    className={`sidebar-backdrop ${mobileOpen ? 'visible' : ''}`}
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <Sidebar
                isDesktop={isDesktop}
                isCollapsed={desktopCollapsed}
                isMobileOpen={mobileOpen}
                onCloseMobile={() => setMobileOpen(false)}
            />

            <div className="content-shell">
                <Header
                    isDesktop={isDesktop}
                    isCollapsed={desktopCollapsed}
                    onToggleCollapse={() => setDesktopCollapsed((v) => !v)}
                    onOpenMobile={() => setMobileOpen(true)}
                />

                <main className="content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
