/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

const customStyles = (isBorder, plColor, arrowColor, creatable, isDisabled) => {
  return {
    control: (provided, state) => {
      return {
        ...provided,
        minHeight: creatable ? 40 : 40,
        height: '100%',
        alignItems: creatable ? 'start' : 'center',
        boxShadow: 'none',
        borderRadius: '5px',
        borderColor: isBorder ? 'var(--aesirxui-border-color)' : 'transparent',
        '&:hover': {
          // borderColor: isBorder ? '#8bdcbc' : 'transparent',
          // borderRight: '1px solid var(input-border-color)',
        },
        // borderRight: '1px solid var(input-border-color)',
        backgroundColor: isDisabled ? 'var(--aesirxui-input-disabled-bg)' : 'var(--aesirxui-white)',
        cursor: 'pointer',
        width: 'auto',
        paddingLeft: state.isMulti ? 0 : 7,
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
        borderLeft: '1px solid var(--aesirxui-gray-dark)',
        borderRight: '1px solid var(--aesirxui-gray-dark)',
        boxShadow: '0 3px 5px rgb(0 0 0 / 5%)',
        borderTop: '1px solid var(--aesirxui-gray-dark)',
        borderBottom: '1px solid var(--aesirxui-gray-dark)',
        zIndex: 10,
      };
    },
    option: (provided, state) => {
      return {
        ...provided,
        color: state.isSelected ? 'var(--aesirxui-menu-lang-color)' : 'var(--aesirxui-body-color)',
        backgroundColor: state.isSelected ? 'var(--aesirxui-menu-lang-hover-bg)' : 'var(--aesirxui-white)',
        '&:hover': {
          color: 'var(--aesirxui-menu-lang-color)',
          backgroundColor: 'var(--aesirxui-menu-lang-hover-bg)',
        },
      };
    },
    indicatorSeparator: () => ({ display: 'none' }),

    dropdownIndicator: (base) => ({
      ...base,
      color: arrowColor ? arrowColor : 'var(--aesirxui-success)',
      '&:hover': {
        color: 'var(--aesirxui-success)',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'var(--aesirxui-body-color)',
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: plColor ? plColor : 'var(--aesirxui-input-placeholder-color)',
      };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: 'var(--aesirxui-menu-lang-hover-bg)',
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
      color: 'var(--aesirxui-body-color)',
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
