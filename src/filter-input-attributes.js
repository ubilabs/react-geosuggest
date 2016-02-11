/**
 * Attributes allowed on input elements
 */
const allowedAttributes = [
  'autoComplete',
  'autoFocus',
  'disabled',
  'form',
  'formAction',
  'formEncType',
  'formMethod',
  'formNoValidate',
  'formTarget',
  'height',
  'id',
  'inputMode',
  'maxLength',
  'name',
  'pattern',
  'placeholder',
  'readOnly',
  'required',
  'size',
  'spellCheck',
  'tabIndex'
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
