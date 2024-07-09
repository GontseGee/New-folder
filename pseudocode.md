//initialize the application
START
FUNCTION initializeApp()
    SET userRole TO 'user'
    CALL loadSavedData() 
    CALL renderUserInterface()
END FUNCTION

FUNCTION loadSavedData()
    LOAD user data from localStorage
    LOAD ticket data from localStorage
    LOAD draw data from localStorage
END FUNCTION

FUNCTION renderUserInterface()
    DISPLAY options to switch between admin and normal user
    IF userRole IS 'admin'
        DISPLAY admin interface
    ELSE
        DISPLAY user interface
    END IF
END FUNCTION

//* admin and user view;

FUNCTION toggleUserRole()
    IF userRole IS 'user'
        SET userRole TO 'admin'
    ELSE
        SET userRole TO 'user'
    END IF
    CALL renderUserInterface()
END FUNCTION

//allows users to select 6 balls from 1-52
FUNCTION selectNumbers()
    DISPLAY 52 balls with color codes
    ALLOW user to select 6 numbers
    DISPLAY selected numbers
    DISPLAY total cost of the ticket(s)
END FUNCTION


//assigning colors to the balls 

FUNCTION colorCodeBalls()
    FOR each ball number FROM 1 TO 52
        IF ball number BETWEEN 1 AND 13
            SET color TO 'red'
        ELSE IF ball number BETWEEN 14 AND 25
            SET color TO 'yellow'
        ELSE IF ball number BETWEEN 26 AND 37
            SET color TO 'green'
        ELSE
            SET color TO 'blue'
        END IF
        DISPLAY ball WITH color
    END FOR
END FUNCTION

// users can choose if they want lottoplus 1 and lottoplus 2 or just lotto
FUNCTION selectLottoPlus()
    DISPLAY checkboxes for Lotto Plus 1 and Lotto Plus 2
    IF Lotto Plus 1 IS selected
        ADD Lotto Plus 1 cost to total cost
    IF Lotto Plus 2 IS selected
        ADD Lotto Plus 2 cost to total cost
    DISPLAY total cost
END FUNCTION

//the user must input the number of boards they are betting
FUNCTION generateBoards()
    PROMPT user to input number of boards
    FOR each board number FROM 1 TO user input
        CREATE empty board
        ALLOW user to select numbers for the board
        ADD board to list of boards
    END FOR
    DISPLAY all boards
END FUNCTION

//

FUNCTION simulateDraw()
    GENERATE 6 random numbers BETWEEN 1 AND 52
    SET draw numbers TO generated numbers
    CALL compareTicketsWithDraw()
    SAVE draw numbers TO localStorage
    ALERT admin with total winning tickets
END FUNCTION

FUNCTION compareTicketsWithDraw()
    FOR each ticket IN saved tickets
        FOR each board IN ticket
            COMPARE board numbers WITH draw numbers
            IF 3 OR MORE numbers match
                ADD ticket TO winning tickets
    END FOR
    SAVE winning tickets TO localStorage
END FUNCTION


// the user must tell how many boards they are betting
FUNCTION selectBoards()
    PROMPT user to input number of boards
    SET totalBoards TO user input
    CALL createTickets(totalBoards)
    DISPLAY total price
END FUNCTION

FUNCTION createTickets(totalBoards)
    SET ticketNumber TO 1
    SET boardCount TO 0
    WHILE totalBoards > 0
        IF boardCount < 10
            ADD new board TO current ticket
            INCREMENT boardCount
            DECREMENT totalBoards
        ELSE
            SAVE current ticket TO localStorage
            RESET boardCount TO 0
            INCREMENT ticketNumber
        END IF
    END WHILE
    SAVE last ticket TO localStorage
END FUNCTION

// calculate the total of the tickets 1 board=R5 lotto+ = R2.5
FUNCTION calculateTotalPrice()
    SET totalPrice TO (number of boards * 5)
    IF Lotto Plus 1 IS selected
        ADD (number of boards * 2.5) TO totalPrice
    IF Lotto Plus 2 IS selected
        ADD (number of boards * 2.5) TO totalPrice
    DISPLAY totalPrice
END FUNCTION


// add R2.5 per lotto+
FUNCTION enterLottoPlus()
    IF Lotto Plus 1 IS selected
        ADD Lotto Plus 1 boards TO tickets
    IF Lotto Plus 2 IS selected
        ADD Lotto Plus 2 boards TO tickets
    SAVE updated tickets TO localStorage
END FUNCTION

// tell the user the total of their boards 
FUNCTION notifyUserBeforePurchase()
    DISPLAY alert WITH ticket details and total cost
END FUNCTION

//tell the user if they have won or not
FUNCTION notifyUserAfterDraw()
    FOR each ticket IN saved tickets
        IF ticket IN winning tickets
            DISPLAY notification TO user
    END FOR
END FUNCTION
//tell the user how many of their tickets have won
FUNCTION notifyAdminAfterDraw()
    DISPLAY alert WITH total winning tickets
END FUNCTION


// local storage usage for storing 
FUNCTION saveDataToLocalStorage()
    SAVE selected numbers TO localStorage
    SAVE ticket details TO localStorage
    SAVE draw results TO localStorage
END FUNCTION

// tell the user when they playes & when the draw is
FUNCTION saveEntryDate(ticket)
    SET currentDate TO today’s date
    ADD currentDate TO ticket
    SAVE updated ticket TO localStorage
END FUNCTION


FUNCTION saveDrawDate()
    SET currentDate TO today’s date
    SAVE drawDate TO localStorage
END FUNCTION


