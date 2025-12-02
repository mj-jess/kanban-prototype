import { NavLink } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { FaX } from 'react-icons/fa6';
import { BsKanbanFill } from 'react-icons/bs';
import { Typography } from '@/ui';

type SidebarProps = {
    isDesktop: boolean;
    isCollapsed: boolean;
    isMobileOpen: boolean;
    onCloseMobile: () => void;
};

export default function Sidebar({
    isDesktop,
    isCollapsed,
    isMobileOpen,
    onCloseMobile,
}: SidebarProps) {
    const openClass = isMobileOpen ? 'is-open' : '';
    const collapsedClass = isCollapsed ? 'is-collapsed' : 'is-expanded';

    return (
        <aside
            className={`sidebar ${isDesktop ? collapsedClass : openClass}`}
            aria-hidden={!isDesktop && !isMobileOpen}
        >
            {!isDesktop && (
                <div className="sidebar-mobile-header">
                    <strong>Menu</strong>
                    <button className="icon-btn" onClick={onCloseMobile} aria-label="Fechar menu">
                        <FaX />
                    </button>
                </div>
            )}

            <nav className="sidebar-nav">
                <NavLink to="/" end className="nav-item">
                    <span className="item-icon">
                        <MdDashboard />
                    </span>
                    <Typography.h4 className="item-label">Dashboard</Typography.h4>
                </NavLink>

                <NavLink to="/kanban" className="nav-item">
                    <span className="item-icon">
                        <BsKanbanFill />
                    </span>
                    <Typography.h4 className="item-label">Kanban</Typography.h4>
                </NavLink>
            </nav>
        </aside>
    );
}
