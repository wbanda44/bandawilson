
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCdoRnGra1VeErWdzr-dZCRAXMD27qB28Q",
    authDomain: "filter-app-d4a66.firebaseapp.com",
    databaseURL: "https://filter-app-d4a66.firebaseio.com",
    projectId: "filter-app-d4a66",
    storageBucket: "filter-app-d4a66.appspot.com",
    messagingSenderId: "636465637475",
    appId: "1:636465637475:web:43232b08b1d8760c227056"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  document.getElementById('form1').addEventListener('submit',function(e){
	  e.preventDefault();
	  nameHTML = document.getElementById('formName');
	  descHTML = document.getElementById('formDesc');
	  firebase.database().ref('names').push({
		  name: nameHTML.value,
		  desc: descHTML.value
	  });
	  nameHTML.value = '';
	  descHTML.value = '';
  });
  
  //render
  (()=>{
	  firebase.database().ref('names').on('value', function(snapshot){
		  var table = document.getElementById('tablenames');
		  table.innerHTML='';
		  var data = snapshot.val();
		  var con= 1;
		  for (const key in data){
			  table.innerHTML+=`
			  <div class="card">
			  <h1>${data[key].name}</h1>
			  <p>${data[key].desc}</p>
			  </div>
			  `;
			  con++;
		  }
	  });
	  
	  let filterInput = document.getElementById('filter');
	  filterInput.addEventListener('keyup', function(){
		  let filterValue= document.getElementById('filter').value;
		  var table = document.getElementById('tablenames');
		  let tr = table.querySelectorAll('div');
		  
		  for (let index = 0; index < tr.length; index++){
			  let val =tr[index].getElementsByTagName('h1')[0];
		  if (val.innerHTML.indexOf(filterValue) > -1){
				  tr[index].style.display='';
			  }else{
				  tr[index].style.display='none';
			  }
		  }
	  });
	  
  })();
