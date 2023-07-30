import classnames from "classnames";

export type IconName = `bi-${string}`;

interface IconProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
    name: IconName,
}

function Icon(props: IconProps) {

    const { name, className, ...rest } = props;
    const classNames = classnames("bi", name, className);

    return (
        <i
            className={classNames}
            {...rest}
        />
    )
}

export { Icon };