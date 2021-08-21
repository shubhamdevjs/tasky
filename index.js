const taskContainer = document.querySelector(".task_container");
let globalstorage = [];

const generateHTMlcode = (getdata) =>{
  return  ` <div class="col-lg-4 col-md-6 my-4" id=${getdata.id}>
  <div class="card ">
    <div class="card-header d-flex justify-content-end gap-2">
      <button class="btn btn-outline-danger" name="${getdata.id}" onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash-alt" name="${getdata.id}"></i></button>
      <button class="btn btn-outline-info" name="${getdata.id}" onclick="editCard.apply(this, arguments)"><i class="fas fa-pencil-alt" name="${getdata.id}"></i></button>    
    </div>
    <div class="card-body ">
      <img src="${getdata.image}" 
      alt="image" class="card-img">
      <h5 class="card-title mt-4">${getdata.title}</h5>
      <p class="card-text">${getdata.description}</p>
      <span class="badge bg-primary">${getdata.type}</span>    
    </div>
    <div class="card-footer ">
      <button class="btn btn-outline-primary " name="${getdata.id}">Open task</button>
    </div>
  </div>
</div>`;
};
const inserttoDOM = (content) =>
  taskContainer.insertAdjacentHTML("beforeend", content);

const saveToLocalStorage = () =>
  localStorage.setItem("tasky", JSON.stringify({ card: globalstorage }));
const addCard = () => {
  //receiving data from the website
  const getdata = {
    id: `${Date.now()}`,
    image: document.getElementById("imageUrl").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("taskType").value,
    description: document.getElementById("bigText").value,
  };
  console.log(getdata);

  globalstorage.push(getdata);
  saveToLocalStorage();

  //generate html code

  const newcard = generateHTMlcode(getdata);

  inserttoDOM(newcard);

  //clear modal

  document.getElementById("imageUrl").value = " ";
  document.getElementById("taskTitle").value = " ";
  document.getElementById("taskType").value = " ";
  document.getElementById("bigText").value = " ";

  return;
};

const loadExistingData = () => {
  const getData = localStorage.getItem("tasky");

  if (!getData) return;

  const taskcards = JSON.parse(getData);

  globalstorage = taskcards.card;

  globalstorage.map((getdata) => {
    const newcard = generateHTMlcode(getdata);

    inserttoDOM(newcard);
  });

  return;
};

const deleteCard = (event) => {
  const targetID = event.target.getAttribute("name");
  const elementType = event.target.tagName;

  const removeTask = globalstorage.filter((task) => task.id !== targetID);
  globalstorage = removeTask;

  saveToLocalStorage();
 
  // access DOM to remove card
  if (elementType === "BUTTON") {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  } else {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode
    );
  }
  
};


const editCard=()=>{
  const elementType = event.target.tagName;

  let taskTitle;
  let taskType;
  let taskDescription;
  let parentElement;
  let submitButton;

  if (elementType == "BUTTON"){
    parentElement=event.target.parentNode.parentNode;
  }
  else{
    event.target.parentNode.parentElement.parentNode;
  }
  // console.log(parentElement.childNodes[3].childNodes);

  taskTitle=parentElement.childNodes[3].childNodes[3];
  taskDescription=parentElement.childNodes[3].childNodes[5];
  taskType=parentElement.childNodes[3].childNodes[7];
  submitButton=parentElement.childNodes[5].childNodes[1];

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute("onclick","saveEdit.apply(this, arguments)");
  submitButton.innerHTML="Save changes";
}

const saveEdit=(event)=>{
  const targetID = event.target.getAttribute("name");
  const elementType = event.target.tagName;

  let parentElement;

  if (elementType == "BUTTON"){
    parentElement=event.target.parentNode.parentNode;
  }
  else{
    event.target.parentNode.parentElement.parentNode;
  }
  console.log(parentElement.childNodes[3].childNodes);

  taskTitle=parentElement.childNodes[3].childNodes[3];
  taskDescription=parentElement.childNodes[3].childNodes[5];
  taskType=parentElement.childNodes[3].childNodes[7];
  submitButton=parentElement.childNodes[5].childNodes[1];

  const updateData={
    title:taskTitle.innerHTML,
    typ:taskType.innerHTML,
    description:taskDescription.innerHTML,
  };
  console.log({updateData,targetID});

  const updateGlobalStorage=globalstorage.map((task)=>{
    if (task.id=targetID){
      return{...task, ...updateData};
    }
    return task;
  });

  globalstorage=updateGlobalStorage;
  
  saveToLocalStorage();

  taskTitle.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  submitButton.innerHTML="Open Task";

};






