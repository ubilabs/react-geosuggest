/**
 * Attributes allowed on input elements
 */
const allowedAttributes = [
  'autocapitalize',
  'autoComplete',
  'autocorrect',
  'autoFocus',
  'autosave',
  'disabled',
  'form',
  'formaction',
  'formenctype',
  'formmethod',
  'formnovalidate',
  'formtarget',
  'height',
  'id',
  'inputmode',
  'maxlength',
  'maxlength',
  'name',
  'pattern',
  'placeholder',
  'readonly',
  'required',
  'selectionDirection',
  'size',
  'spellcheck',
  'tabindex'
];

/**
 * Filter the properties for only allowed input properties
 * @param  {Object} props The properties to filter
 * @return {Object} The filtered, allowed properties
 */
export default function(props) {
  const attributes = {};

  allowedAttributes.forEach(allowedAttribute => {
    if (props[allowedAttribute]) {
      attributes[allowedAttribute] = props[allowedAttribute];
    }
  });

  return attributes;
}
