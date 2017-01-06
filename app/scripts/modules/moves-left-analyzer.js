function areThereMovesLeft(total, availableTiles) {
  const possibleValues = availableTiles.map(tile => tile.getValue()).filter(value => value <= total);
  return testForAvailableMoves(total, possibleValues, 0);
}

function testForAvailableMoves(total, values, depth) {
    console.log(`testForAvailableMoves(${total}, ${values}, ${depth})`)
    if (total == 0) {
      return true;
    } else if (depth == 4) {
      return false;
    } else {
        return values.reduce((availableMoves, val, i) => {
          const nextTotal = total - val;
          const nextValues = [].concat(values.slice(0, i), values.slice(i + 1, values.length));
          const nextDepth = depth + 1;

          if (nextTotal < 0) {
            return availableMoves;
          } else {
            return availableMoves || testForAvailableMoves(nextTotal, nextValues, nextDepth);
          }
        }, false)
    }
}

function computeValueDifferences(total, values) {
    let valueDifferences = {};
    values.forEach(value => {
        const difference = total - value;
        if (difference >= 0) {
          valueDifferences[value] = total - value;
        }
    });
    return valueDifferences;
}

function anyDifferencesAreZero(valueDifferences) {
  Object.values(valueDifferences).some(difference => difference == 0);
}

export default areThereMovesLeft;