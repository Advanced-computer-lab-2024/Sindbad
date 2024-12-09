import React from 'react';
import Select from 'react-select';

function ReactSelect({ options, onChange, multi, defaultValue, value }) {
    const filterStyles = {
        control: (styles, state) => ({
            ...styles,
            width: "100%",
            minHeight: '32px',
            margin: 0,
            fontSize: 12,
            backgroundColor: '#ffffff',
            borderRadius: "calc(0.5rem - 2px)",
            color: "#ff1111",
            border: "1px solid #e4e4e7",
            boxShadow: state.isFocused ? "0 0 0 1px #fbbf24" : "1px solid #e4e4e7",
            '&:hover': {
                border: "1px solid #e4e4e7"
            },
        }),
        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                color: '#a3a3a3',
            }
        },
        option: (styles, state) => ({
            ...styles,
            fontSize: 12,
            width: "100%",
            height: '32px',
            backgroundColor: state.isFocused ? "#eeeeee" : "#ffffff",
            ':active': {
                backgroundColor: "#eeeeee"
            },
            color: "#111111",
        }),
        menu: (provided) => ({
            ...provided,
            overflow: 'clip',
            backgroundColor: "#ffffff",
            borderRadius: "calc(0.5rem - 2px)"
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            minHeight: '32px',
            padding: '0 6px',
        }),
        input: (provided, state) => ({
            ...provided,
            margin: '0px',
            color: "#111111",
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '32px',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "#111111",
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: "#a3a3a3",
            width: '32px',
            marginLeft: '-3px',
            cursor: "pointer",
            "&:hover": {
                color: "#a3a3a3",
            }
        }),
        noOptionsMessage: (provided, state) => ({
            ...provided,
            fontSize: 12,
            height: '32px',
        }),
        multiValue: (styles) => {
            return {
                ...styles,
                //   backgroundColor: 
            };
        },
        multiValueLabel: (styles) => ({
            ...styles,
            // color: 
        }),
        multiValueRemove: (styles) => ({
            ...styles,
            ':hover': {
                backgroundColor: "#e0e0e0",
                //   color: '#888888',
            },
        }),
        clearIndicator: (styles) => ({
            ...styles,
            color: "#a3a3a3",
            width: '32px',
            cursor: "pointer",
            "&:hover": {
                color: "#a3a3a3",
            }
        }),
    }

    const defaultStyles = {
        control: (styles, state) => ({
            ...styles,
            width: "100%",
            minHeight: '32px',
            height: '32px',
            margin: 0,
            marginLeft: 0,
            fontSize: 12,
            backgroundColor: '#ffffff',
            borderRadius: "calc(0.5rem - 2px)",
            color: "#ff1111",
            border: "1px solid #e4e4e7",
            boxShadow: state.isFocused ? "0 0 0 1px #fbbf24" : "1px solid #e4e4e7",
            '&:hover': {
                border: "1px solid #e4e4e7"
            },
        }),
        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                color: '#a3a3a3',
            }
        },
        option: (styles, state) => ({
            ...styles,
            fontSize: 12,
            width: "100%",
            height: '32px',
            backgroundColor: state.isFocused ? "#eeeeee" : "#ffffff",
            ':active': {
                backgroundColor: "#eeeeee"
            },
            color: "#111111",
        }),
        menu: (provided) => ({
            ...provided,
            overflow: 'clip',
            backgroundColor: "#ffffff",
            borderRadius: "calc(0.5rem - 2px)"
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            height: '32px',
            padding: '0 6px',
        }),
        input: (provided, state) => ({
            ...provided,
            margin: '0px',
            color: "#111111",
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            height: '32px',
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "#111111",
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            color: "#a3a3a3",
            width: '32px',
            marginLeft: '-3px',
            cursor: "pointer",
            "&:hover": {
                color: "#a3a3a3",
            }
        }),
        noOptionsMessage: (provided, state) => ({
            ...provided,
            fontSize: 12,
            height: '32px',
        }),
        clearIndicator: (styles) => ({
            ...styles,
            color: "#a3a3a3",
            width: '32px',
            cursor: "pointer",
            "&:hover": {
                color: "#a3a3a3",
            }
        }),
    }

    return (
        <>
            {multi === true ?
                <Select
                    isMulti
                    name="colors"
                    options={options}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={filterStyles}
                    onChange={onChange}
                    defaultValue={defaultValue || "Select"}
                    menuPlacement="auto"
                />
                : value ?
                    <Select
                        name="colors"
                        options={options}
                        classNamePrefix="select"
                        styles={defaultStyles}
                        onChange={onChange}
                        defaultValue={defaultValue || "Select"}
                        menuPlacement="auto"
                        value={value?.value ? value : null}
                    />
                    :
                    <Select
                        name="colors"
                        options={options}
                        classNamePrefix="select"
                        styles={defaultStyles}
                        onChange={onChange}
                        defaultValue={defaultValue || 'Select'}
                        menuPlacement="auto"
                    />
            }
        </>
    )
}

export default ReactSelect;