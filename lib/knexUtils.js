function handleError(err) {
  next(err);
};

function sendResults(results) {
  res.send(results);
};

module.exports = {
  handleError,sendResults
}
