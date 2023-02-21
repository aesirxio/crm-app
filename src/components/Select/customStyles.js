/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const customStyles = (isBorder, plColor, arrowColor, creatable, isDisabled) => {
  return {
    control: (provided) => {
      return {
        ...provided,
        minHeight: creatable ? 40 : 40,
        height: '100%',
        alignItems: creatable ? 'start' : 'center',
        boxShadow: 'none',
        borderRadius: '5px',
        borderColor: isBorder ? 'var(--input-border-color)' : 'transparent',
        '&:hover': {
          // borderColor: isBorder ? '#8bdcbc' : 'transparent',
          // borderRight: '1px solid var(input-border-color)',
        },
        // borderRight: '1px solid var(input-border-color)',
        backgroundColor: isDisabled ? 'var(--input-border-color)' : 'var(--bs-white)',
        cursor: 'pointer',
        width: 'auto',
        paddingLeft: creatable ? 0 : 7,
        paddingRight: 7,
      };
    },

    menu: (styles) => {
      return {
        ...styles,
        top: 'calc(100% - 5px)',
        margin: 0,
        border: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderLeft: '1px solid var(--input-border-color)',
        borderRight: '1px solid var(--input-border-color)',
        boxShadow: '0 3px 5px rgb(0 0 0 / 5%)',
        borderTop: '1px solid var(--input-border-color)',
        borderBottom: '1px solid var(--input-border-color)',
        zIndex: 10,
        backgroundColor: 'var(--dropdown-bg)',
      };
    },
    option: (provided, state) => {
      return {
        ...provided,
        color: state.isSelected ? 'var(--dropdown-item-hover-color)' : 'var(--dropdown-item-color)',
        backgroundColor: state.isSelected ? 'var(--dropdown-item-hover-bg)' : 'var(--dropdown-bg)',
        '&:hover': {
          color: 'var(--dropdown-item-hover-color)',
          backgroundColor: 'var(--dropdown-item-hover-bg)',
        },
      };
    },
    indicatorSeparator: () => ({ display: 'none' }),

    dropdownIndicator: (base) => ({
      ...base,
      color: arrowColor ? arrowColor : 'var(--bs-success)',
      '&:hover': {
        color: 'var(--bs-success)',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--bs-body-color)',
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: plColor ? plColor : 'var(--input-placeholder-color)',
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: 'var(--dropdown-multi-bg)',
        margin: '0 8px 5.5px 2px',
        borderRadius: '5px',
      };
    },
    multiValueRemove: (styles) => ({
      ...styles,
      paddingLeft: '12px',
      paddingRight: '8px',
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--bs-body-color)',
      backgroundColor: 'var(--dropdown-multi-bg)',
      order: 2,
      padding: '10px 16px 10px 0',
      paddingLeft: '0',
      fontSize: '14px',
    }),
    valueContainer: (provided, state) => {
      return {
        ...provided,
        paddingTop: '5.5px',
        paddingBottom: state.hasValue && state.isMulti ? '0' : '5.5px',
      };
    },
  };
};

export default customStyles;
