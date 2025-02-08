import { useNavigate } from "react-router-dom";

const Button = ({
    children = 'Button',
    className = '',
    extraClassName = '',
    href,
    ...props
}) => {
    const nav = useNavigate();

    const handleRouterClick = () => {
        if (href) {
            nav(href);
        }
    };

    return (
        <button
            className={`
                ${className || "relative inline-flex items-center justify-center"}
                px-6 py-2 font-semibold text-main text-sm 
                bg-gradient-to-r from-primary via-[#3e3760] to-primary
                border border-[#bfb7e5] shadow-md shadow-[#2a243f]
                transition-all duration-300 ease-in-out
                hover:shadow-lg hover:shadow-[#463b69]
                active:scale-95
                ${extraClassName}
            `}
            onClick={handleRouterClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
