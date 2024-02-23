type AnyObject = { [key: string]: any };

function deleteObjectElementsHasInObject(sourceObject:AnyObject, elementsToRemove:AnyObject):AnyObject {
  const resultObject:AnyObject = {...sourceObject}
  for (const key in resultObject) {
    if (Object.prototype.hasOwnProperty.call(elementsToRemove, key)) {
      if (typeof resultObject[key] === 'object' && typeof elementsToRemove[key] === 'object') {
        const objectWithDeletedElements = deleteObjectElementsHasInObject(resultObject[key], elementsToRemove[key]); // Рекурсивный вызов для вложенных объектов
        if(Object.keys(objectWithDeletedElements).length > 0){
          resultObject[key] = objectWithDeletedElements
        } else {
          delete resultObject[key];
        }
      } else {
        delete resultObject[key];
      }
    }
  }
  return resultObject
}

export {deleteObjectElementsHasInObject}