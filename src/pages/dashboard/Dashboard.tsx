import { Button, Typography, type ButtonColor, type ButtonVariant } from '@/ui';

export default function Dashboard() {
    const variants = ['fill', 'outline', 'ghost', 'link'] as ButtonVariant[];
    const buttons = [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'danger',
        'info',
        'warning',
    ] as ButtonColor[];

    return (
        <div>
            <Typography.h1>Dashboard</Typography.h1>
            <Typography.p>Welcome to the dashboard! Here are some buttons:</Typography.p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
                {variants.map((variant) => (
                    <div key={variant} style={{ display: 'flex', gap: 12 }}>
                        {buttons.map((color) => (
                            <Button key={color} variant={variant} color={color}>
                                {color}
                            </Button>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
