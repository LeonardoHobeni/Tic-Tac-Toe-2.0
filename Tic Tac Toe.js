let gameBoard= [], playerXCount =5, playerOCount=5, gameName;
document.querySelector(".menuButton").addEventListener('click', reStartGame);
function winner()
{   var countX=0, countO=0;
    //checking rows
    for(let i=1; i<=7; i+=3)
    {
        for(let j=i; j<=(i+2); j+=1)
        {
            if((document.querySelector("#button"+j)).value=='X')
                countX+=1;
            if((document.querySelector("#button"+j)).value=='O')
                countO+=1;
        }
        if(countO==3 || countX==3)
            return true;
        else
        {
            countO=0;
            countX=0;   
        }
            
    }

    //checking columns
    for(let i=1; i<=3; i+=1)
    {
        for(let j=i; j<=(i+6); j+=3)
        {
            if((document.querySelector("#button"+j)).value=='X')
                countX+=1;
            if((document.querySelector("#button"+j)).value=='O')
                countO+=1;
        }
        if(countO==3 || countX==3)
            return true;
        else
        {
            countO=0;
            countX=0;   
        }
    }

    //checking main diagonal
    {
        for(let i=1; i<=9; i+=4)
        {
            if((document.querySelector("#button"+i)).value=='X')
                countX+=1;
            if((document.querySelector("#button"+i)).value=='O')
                countO+=1;
        }
        if(countO==3 || countX==3)
            return true;
        else
        {
            countO=0;
            countX=0;   
        }
    }

    //checking other diagonal
    {
        for(let i=3; i<=7; i+=2)
        {
            if((document.querySelector("#button"+i)).value=='X')
                countX+=1;
            if((document.querySelector("#button"+i)).value=='O')
                countO+=1;
        }
        if(countO==3 || countX==3)
            return true;
        else
        {
            countO=0;
            countX=0;   
        }
    }
    return false;
}

function whoWon()
{   var countX=0, countO=0;
     //checking rows
     for(let i=1; i<=7; i+=3)
     {
         for(let j=i; j<=(i+2); j+=1)
         {
             if((document.querySelector("#button"+j)).value=='O')
                 countO+=1;
         }
         if(countO==3)
             return 'O';
         else
         {
             countO=0;
             countX=0;   
         }
             
     }
 
     //checking columns
     for(let i=1; i<=3; i+=1)
     {
         for(let j=i; j<=(i+6); j+=3)
         {
             if((document.querySelector("#button"+j)).value=='O')
                 countO+=1;
         }
          if(countO==3)
             return 'O';
          else
          {
            countO=0;
            countX=0;   
          }
     }
 
     //checking main diagonal
     {
        for(let i=1; i<=9; i+=4)
         {
             if((document.querySelector("#button"+i)).value=='O')
                 countO+=1;
         }
         if(countO==3)
            return 'O';
         else
         {
            countO=0;
            countX=0;   
         }
     }
 
     //checking other diagonal
     {
         for(let i=3; i<=7; i+=2)
         {
             if((document.querySelector("#button"+i)).value=='O')
                 countO+=1;
         }
         if(countO==3)
             return 'O';
          else
          {
            countO=0;
            countX=0;   
          }
     }
     return 'X';
}

function isDraw()
{
    if((playerXCount<=0 && playerOCount<=1)&& !winner())
        return true;
    return false;
}

function buildBoard(containerID, dataSchema)
{
    var container= document.querySelector('#'+containerID);
    schema= dataSchema;
    for(let i=0; i<3; i+=1)
    {
        container.appendChild(makeElement(dataSchema[i]));
    }
}

function reStartGame()
{
    var response= confirm("Click OK to clear board and restart game.");
    if(response)
    {
        for(let pos=1; pos<=9; pos+=1)
        {
            (document.querySelector("#button"+pos)).value="_";
            (document.querySelector("#button"+pos)).textContent="_";
        }
        playerOCount=playerXCount=5;
        (document.querySelector('#playerLabel')).textContent="";
        (document.querySelector("#gameLabel")).textContent="";
    }
}

function makeElement(description)
{
    var contPar= document.createElement("p");
    for(item of description)
    {
        var buttonElement= document.createElement("button");
        buttonElement.setAttribute("id", item.id);
        let id= item.id;
        buttonElement.setAttribute("onclick", "placeSymbol(id);");
        if(item.row=="1")
            buttonElement.classList.add("firstRow");
        else if(item.row="2")
            buttonElement.classList.add("secondRow");
        else
            buttonElement.classList.add("thirdRow");
        buttonElement.value= "_";
        buttonElement.textContent="_";
        contPar.appendChild(buttonElement);
    }
    return contPar;
}

function NotEmpty(id)
{
    let btn= document.querySelector('#'+id);
    if(btn.value == "_")
        return false;
    return true;
}

function playerTurn()
{
    if(playerXCount<playerOCount)
        return 'O';
    return 'X';
}

function gameOn()
{
    if(winner())
    {
        (document.querySelector("#gameLabel")).textContent= "Player "+whoWon()+" won.";
        return false;
    }
    else if(isDraw())
    {
        (document.querySelector("#gameLabel")).textContent= "It is a tie.";
        return false;
    }
    return true;
}

function placeSymbol(id)
{
    let elementButton= document.querySelector('#'+id);
    if(gameOn())
    {

        if(!NotEmpty(id))
        {
            elementButton.value= playerTurn();
            elementButton.textContent= playerTurn();
            if(playerTurn() == 'X')
                playerXCount-=1;
            else
                playerOCount-=1;
            if(gameOn())
                (document.querySelector('#playerLabel')).textContent="Player "+playerTurn()+" turn:";
            else
            {
                (document.querySelector('#playerLabel')).textContent= "Game Over!!!";
            }
        }
        else
            (document.querySelector('#playerLabel')).textContent="Space not empty";
    }
    else
    {
        (document.querySelector('#playerLabel')).textContent= "Game Over!!!";
    }
}

