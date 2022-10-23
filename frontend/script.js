//const idArray = []; 
function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3001/api/member/getAllMembers");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
         // idArray.push( object['id']);
          trHTML += '<tr>'; 
          trHTML += '<td>'+object['id']+'</td>';
          trHTML += '<td>'+object['name']+'</td>';
          trHTML += '<td>'+object['address']+'</td>';
         // trHTML += '<td>'+object['wasSick']+'</td>';
          //console.log(object['wasSick']);
         // trHTML += '<td>'+object['sickDate']+'</td>';
            if(new Date(object['sickDate']).getYear()!='70')
            {
                 trHTML += '<td>'+new Date(object['sickDate']).toLocaleDateString()+'</td>';
            }
            else{
                trHTML += '<td>' +" "+'</td>';
            }
          console.log((new Date((object['sickDate']))).toLocaleDateString());
          console.log((new Date((object['sickDate']))).getYear());
          trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showMemberEditBox('+object['id']+')">Edit</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="memberDelete('+object['id']+')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
}
  
loadTable();

function showMemberCreateBox() {
    Swal.fire({
      title: 'Create Member:',
      html:
        '<input id="memberid" class="swal2-input" placeholder="ID">' +
        '<input id="name" class="swal2-input" placeholder="Name">' +
        '<input id="address" class="swal2-input" placeholder="Address">'+
        // '<input type="checkbox"  id="wasSick" class="swal2-input" placeholder="was sick?"/> I was Sick'+
        '<input  type="date" class="swal2-input"  id="sickDate" /> Positive result date ',
        focusConfirm: false,
      preConfirm: () => {
        memberCreate();
      }
    })
}

  function memberCreate() {
    const id = document.getElementById("memberid").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
   // const wasSick = document.getElementById("wasSick").value;
    const sickDate = document.getElementById("sickDate").value;
  //  console.log(wasSick+"orale");
    // const x =  isMemberExistById(id);
    // console.log(x);
    // if(isMemberExistById(id) == false){
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3001/api/member/createNewMember");
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify({ 
            "id": id, "name": name, "address": address , "sickDate": sickDate
            //,"wasSick":wasSick
        }));
        xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            alert('New member added!');
            //Swal.fire(objects['message']);
            loadTable();
        }
        };

}

function isMemberExistById(id){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3001/api/member/getMemberById/"+id);
    xhttp.send();
     xhttp.onreadystatechange =  function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        console.log(objects);
         if(objects.length==0)
         {
             console.log(objects);
             return false;
         }
        else {
             alert("Id already exist");
             return true;
         }
      
      }
    };
}

function showMemberEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3001/api/member/getMemberById/"+id);
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        console.log(objects[0]);
        Swal.fire({
          title: 'Edit Member',
          html:
            '<input id="id" disabled class="swal2-input" placeholder="id" value="'+objects[0]['id']+'">' +
            '<input id="name" class="swal2-input" placeholder="name" value="'+objects[0]['name']+'">' +
            '<input id="address" class="swal2-input" placeholder="address" value="'+objects[0]['address']+'">' ,
          focusConfirm: false,
          preConfirm: () => {
            memberEdit();
          }
        })
      }
    };
}
  
function memberEdit() {
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3001/api/member/updateMember");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id, "name": name, "address": address,
     
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        //Swal.fire(objects['message']);
        alert('member updated!');
        loadTable();
      }
    };
}

function memberDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3001/api/member/deleteMember");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        // Swal.fire(objects['message']);
        alert('The member deleted!');
        loadTable();
      } 
    };
}
 