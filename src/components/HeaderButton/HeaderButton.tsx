import { Button } from "antd";
import { MouseEventHandler } from "react";

export const HeaderButton = ({
    onClick,
}: {
    onClick: MouseEventHandler<HTMLElement>;
}) => {
    return (
        <Button
            type="primary"
            style={{
                backgroundColor: 'transparent',
                border: 'none',
                transition: 'background-color 0.3s ease',
            }}
            onClick={(e) => {
                if (onClick) {
                    onClick(e);
                }
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
                e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
            }}
        >
            +
        </Button>
    );
};