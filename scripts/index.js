//setup of the entire list of people

const docList = document.querySelector('#rowsPeople');

let html = '';

const setupDocs = (data) => {

  //dropdownOptions = document.getElementById('filter').value;

  if (window.dropdownFilter == "All") {

  window.namesIdArray = [];

  let html = '';

  var count = 0;
  data.forEach(doc => {

    window.guide = doc.data().name;

    window.namesIdArray.push(doc.id);

    const li = `
    <tr class="modal-trigger" data-target="peopleModal" id = "${doc.id}" value = "test" onclick="completedPressed(this.id)">
        <td value="${doc.id}">${window.guide}</td>
      </tr>
    `;

    html += li;

  });

  docList.innerHTML = html;

} else if (window.dropdownFilter == "Completed") {

  window.namesIdArray = [];

  let html = '';

  var count = 0;
  data.forEach(doc => {

    window.guide = doc.data().name;

    window.namesIdArray.push(doc.id);

    const li = `
    <tr class="modal-trigger" data-target="peopleCompleted" id = "${doc.id}" onclick="completePressed(this.id)">
        <td>${window.guide}</td>
      </tr>
    `;

    html += li;

  });

  docList.innerHTML = html;

}

}

function setupDocsEmpty() {

  const docListEmpty = document.querySelector('#rowsPeople');

  let html = '';

    const li = `
    <div>
      <h4 class="center-align">No new people</h4>
    </div>
    `;

    html += li;

  docListEmpty.innerHTML = html;

}

(new URL(window.location.href)).searchParams.forEach((x, y) =>
    document.getElementById(y).value = x)

//When the document loads

/*window.onload = function() {

   showList();

};*/

//Do this funtion when the document loads

function showList() {

  window.namesArray = [];
  window.namesArrayNormal = [];

  window.namesArrayCompleted = [];
  window.namesArrayNormalCompleted = [];

  window.namesId = [];

  window.dropdownFilter = "All";

  const html1 = `

  <div>Filter: All</div>

  `;

  filterName.innerHTML = html1;

  /*dropdownAll.classList.add('grey');
  dropdownAll.classList.add('lighten-1');

  dropdownCompleted.classList.remove('grey');
  dropdownCompleted.classList.remove('ligthen-1');*/

  db.collection(window.loginEmail).get().then(snapshot => {

      if (snapshot.empty) {

        console.log('empty');

        setupDocsEmpty();

      } else {

        console.log('not empty');

      snapshot.docs.forEach(doc => {

        setupDocs(snapshot.docs);

        window.namesArray.push(doc.data().name.toLowerCase().trim());
        window.namesArrayNormal.push(doc.data().name);

        window.namesId.push(doc.id);

      });

    }

      //window.dropdownSelect = "All";

    });

  db.collection(window.loginEmailCompleted).get().then(snapshot => {

    snapshot.docs.forEach(doc => {

      window.namesArrayCompleted.push(doc.data().name.toLowerCase().trim());
      window.namesArrayNormalCompleted.push(doc.data().name);

    });

  });

}

//When something is typed in the search bar

let searchBar = document.querySelector('#textBoxSearch');

searchBar.addEventListener('input', function() {

  if (window.dropdownFilter == 'All') {

  var newNames = window.namesArray;
  console.log(newNames);

  var oldNames = window.namesArrayNormal;
  console.log(oldNames);

  window.indexArray = [];

  var searchText = document.getElementById('textBoxSearch').value.toLowerCase();
  console.log(searchText);

  for (i = 0; i < newNames.length; i++) {

    var stringNames = "";

    for (j = 0; j < newNames[i].length; j++) {

      stringNames = stringNames + newNames[i].substring(j, j+1);

      //console.log(newNames[i].substring(0, j+1));

      if (searchText == stringNames) {

        //console.log(newNames.indexOf(newNames[i]));

        window.indexArray.push(newNames.indexOf(newNames[i]));

        //console.log(window.indexArray);

     } else if (searchText == 0) {

       db.collection(window.loginEmail).get().then(snapshot => {

        snapshot.docs.forEach(doc => {

          //console.log(doc.data().name);

          setupDocs(snapshot.docs);

        });

      });

      }



    }
}

console.log(window.indexArray);

window.simplifiedNamesArray = [];

for (k = 0; k < window.indexArray.length; k++) {

  window.simplifiedNamesArray.push(oldNames[window.indexArray[k]]);

  db.collection(window.loginEmail).where('name', 'in', window.simplifiedNamesArray).get().then(snapshot => {

   snapshot.docs.forEach(doc => {

     //console.log(doc.data().name);

     setupDocs(snapshot.docs);

   });

 });

}

console.log(window.simplifiedNamesArray);

} else {

var newNamesCompleted = window.namesArrayCompleted;
console.log(newNamesCompleted);

var oldNamesCompleted = window.namesArrayNormalCompleted;
console.log(oldNamesCompleted);

window.indexArrayCompleted = [];

var searchText = document.getElementById('textBoxSearch').value.toLowerCase();
console.log(searchText);

for (i = 0; i < newNamesCompleted.length; i++) {

  var stringNamesCompleted = "";

  for (j = 0; j < newNamesCompleted[i].length; j++) {

    stringNamesCompleted = stringNamesCompleted + newNamesCompleted[i].substring(j, j+1);

    //console.log(newNames[i].substring(0, j+1));

    if (searchText == stringNamesCompleted) {

      //console.log(newNames.indexOf(newNames[i]));

      window.indexArrayCompleted.push(newNamesCompleted.indexOf(newNamesCompleted[i]));

      //console.log(window.indexArray);

   } else if (searchText == 0) {

     db.collection(window.loginEmailCompleted).get().then(snapshot => {

      snapshot.docs.forEach(doc => {

        //console.log(doc.data().name);

        setupDocs(snapshot.docs);

      });

    });

    }



  }
}

console.log(window.indexArrayCompleted);

window.simplifiedNamesArrayCompleted = [];

for (k = 0; k < window.indexArrayCompleted.length; k++) {

window.simplifiedNamesArrayCompleted.push(oldNamesCompleted[window.indexArrayCompleted[k]]);

db.collection(window.loginEmailCompleted).where('name', 'in', window.simplifiedNamesArrayCompleted).get().then(snapshot => {

 snapshot.docs.forEach(doc => {

   //console.log(doc.data().name);

   setupDocs(snapshot.docs);

 });

});

}

console.log(window.simplifiedNamesArrayCompleted);

}

});

//When the dropdown menu is changed

/*function dropdownOption() {

  window.dropdownSelect = document.getElementById('filter').value;

  if (window.dropdownSelect == "All") {

    db.collection(window.loginEmail).get().then(snapshot => {

      if (snapshot.empty) {

        console.log('empty');

        setupDocsEmpty();

      } else {

        console.log('not empty');

      snapshot.docs.forEach(doc => {

        setupDocs(snapshot.docs);

      });

    }

    });

  } else if (window.dropdownSelect == "Completed") {

    db.collection(window.loginEmailCompleted).get().then(snapshot => {

      if (snapshot.empty){

        console.log('empty');

        setupDocsEmpty();

      } else {

        console.log('not empty');

        snapshot.docs.forEach(doc => {

          setupDocs(snapshot.docs);

        });

    }

    });

  }

}*/

function completedPressed(buttonId) {

  const peopleInfo = document.querySelector('.peopleDetails');

  const imageInfo = document.querySelector('.imageDetails');

  window.testVariable = buttonId;

  db.collection(window.loginEmail).doc(buttonId).get().then((snapshot) => {

    const peopleName = snapshot.data().name;

    const peopleEmail = snapshot.data().EmailAddress;

    const peopleProduct = snapshot.data().TypeofProduct;

    const peoplePhoneNumber = snapshot.data().CustomerPhoneNumber;

    const peoplePrice = snapshot.data().Price;

    const peopleImage = snapshot.data().TypeofProduct + '-1623.jpg';

    console.log(peopleImage);

    const html1 = `

    <div><p>${peopleName}</p></div>
    <div><p>${peopleEmail}</p></div>
    <div><p>${peopleProduct}</p></div>
    <div><p>${peoplePhoneNumber}</p></div>
    <div><p>${peoplePrice}</p></div>

    `;

    peopleInfo.innerHTML = html1;

    const html2 = `

    <img width="150" src="images/${peopleImage}">

    `;

    imageInfo.innerHTML = html2;

  });

}

function completedButtonPressed(testVariable) {

  var namesInformation = '';

  db.collection(window.loginEmail).doc(testVariable).get().then((querySnapshot) => {

    namesInformation = querySnapshot.data().name;

    emailInformation = querySnapshot.data().EmailAddress;

    productInformation = querySnapshot.data().TypeofProduct;

    phoneNumberInformation = querySnapshot.data().CustomerPhoneNumber;

    priceInformation = querySnapshot.data().Price;

    console.log(namesInformation);

    console.log(emailInformation);

    console.log(productInformation);

    console.log(phoneNumberInformation);

    console.log(priceInformation);

    db.collection(window.loginEmailCompleted).doc(testVariable).set({

      name: namesInformation,

      EmailAddress: emailInformation,

      TypeofProduct: productInformation,

      CustomerPhoneNumber: phoneNumberInformation,

      Price: priceInformation



    }).then(() => {

      db.collection(window.loginEmail).doc(testVariable).delete().then(() => {

        console.log('document successfully deleted');

        window.location.reload(true);

      }).catch((error) => {

        console.log('Error deleting document', error);

      });

    }).catch((error) => {

      console.log('Error completing name', error);

    });

 });

 /*db.collection('people').get().then(snapshot => {

   snapshot.docs.forEach(doc => {

     setupDocs(snapshot.docs);

   });

 });*/

}

function completePressed(completedId) {

  const peopleInfo = document.querySelector('.completedDetails');

  const imageInfo = document.querySelector('.completedImage');

  window.testVariable1 = completedId;

  db.collection(window.loginEmailCompleted).doc(completedId).get().then((snapshot) => {

    const peopleName = snapshot.data().name;

    const peopleEmail = snapshot.data().EmailAddress;

    const peopleProduct = snapshot.data().TypeofProduct;

    const peoplePhoneNumber = snapshot.data().CustomerPhoneNumber;

    const peoplePrice = snapshot.data().Price;

    const peopleImage = snapshot.data().TypeofProduct + '-1623.jpg';

    const html1 = `

    <div><p>${peopleName}</p></div>
    <div><p>${peopleEmail}</p></div>
    <div><p>${peopleProduct}</p></div>
    <div><p>${peoplePhoneNumber}</p></div>
    <div><p>${peoplePrice}</p></div>

    `;

    peopleInfo.innerHTML = html1; 

    const html2 = `

    <img width="150" src="images/${peopleImage}">

    `;

    imageInfo.innerHTML = html2;

  });

}

//const dropdownAll = document.getElementById('filterAll');

const dropdownSelection = document.getElementById('filter');

const filterName = document.getElementById('filterLabel');

dropdownSelection.addEventListener('click', (e) => {

  e.preventDefault();

  if (window.dropdownFilter == 'All') {

  window.dropdownFilter = "Completed";

  const html2 = `

  <div>Filter: Completed</div>

  `;

  filterName.innerHTML = html2;

  /*dropdownAll.classList.add('grey');
  dropdownAll.classList.add('lighten-1');

  dropdownCompleted.classList.remove('grey');
  dropdownCompleted.classList.remove('ligthen-1');*/

  db.collection(window.loginEmailCompleted).get().then(snapshot => {

    if (snapshot.empty) {

      console.log('empty');

      setupDocsEmpty();

    } else {

      console.log('not empty');

    snapshot.docs.forEach(doc => {

      setupDocs(snapshot.docs);

    });

  }

  });

} else if (window.dropdownFilter == 'Completed') {

  window.dropdownFilter = 'All';

  const html3 = `

  <div>Filter: All</div>

  `;

  filterName.innerHTML = html3;

  /*dropdownAll.classList.add('grey');
  dropdownAll.classList.add('lighten-1');

  dropdownCompleted.classList.remove('grey');
  dropdownCompleted.classList.remove('ligthen-1');*/

  db.collection(window.loginEmail).get().then(snapshot => {

    if (snapshot.empty) {

      console.log('empty');

      setupDocsEmpty();

    } else {

      console.log('not empty');

    snapshot.docs.forEach(doc => {

      setupDocs(snapshot.docs);

    });

  }

  });

}

});

/*const dropdownCompleted = document.getElementById('filterCompleted');

dropdownCompleted.addEventListener('click', (e) => {

  e.preventDefault();

  window.dropdownFilter = "Completed";

  const html3 = `

  <div>Completed</div>

  `;

  filterName.innerHTML = html3;

  dropdownCompleted.classList.add('grey');
  dropdownCompleted.classList.add('lighten-1');

  dropdownAll.classList.remove('grey');
  dropdownAll.classList.remove('ligthen-1');

  db.collection(window.loginEmailCompleted).get().then(snapshot => {

    if (snapshot.empty){

      console.log('empty');

      setupDocsEmpty();

    } else {

      console.log('not empty');

      snapshot.docs.forEach(doc => {

        setupDocs(snapshot.docs);

      });

  }

  });

});*/
