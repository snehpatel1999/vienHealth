import Select from "react-select";

type SelectProps = {
 value?: any;
 onChange?: any;
 placeholder? : string;
 options: any,
 isMulti?: boolean;
 name?: any;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ value, options, onChange, placeholder, isMulti, name, ...props }: SelectProps) => {
  return (
    <Select
        placeholder={placeholder}
        name={name}
        components={{
            IndicatorSeparator: () => null,
            // DropdownIndicator: () => <Dropdown color="black" />,
        }}
        options={options}
        isSearchable
        isMulti={isMulti}
        onChange={onChange}
        styles={{
            container: (styles) => ({
            ...styles,
            width: "100%",
            }),
            control: (styles, { isFocused }) => ({
            ...styles,
            height: 60,
            borderRadius: 14,
            marginBottom: 24,
            padding: "0px 16px",
            boxShadow: "none",
            border: isFocused
                ? "solid 1px var(--stroke) !important"
                : "solid 1px var(--stroke) !important",
            }),
            menu: (styles) => ({
            ...styles,
            borderRadius: 14,
            boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.15) !important",
            }),
            menuList: (styles) => ({
            ...styles,
            borderRadius: 8,
            }),
            option: (styles, { isSelected }) => ({
            ...styles,
            backgroundColor:
                (isSelected && "#f5f5f5 !important") || "#fff!important",
            outline: "none",
            padding: "14px",
            cursor: "pointer",
            color: "var(--default)",
            fontSize: 16,
            lineHeight: "24px",
            }),
            placeholder: (styles) => ({
            ...styles,
            color: "var(--gray)"
            }),
            singleValue: (styles) => ({
            ...styles,
            fontSize: 16,
            lineHeight: 24,
            }),
        }}
        {...props}
    />
  );
};
