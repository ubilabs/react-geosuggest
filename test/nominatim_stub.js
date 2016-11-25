function geocode(query) {
  return new Promise(() => [{displayName: query}]);
}
exports.geocode = geocode;
