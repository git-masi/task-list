This todo list is based on the project in Brad Traversy's course "Modern Javascript From the Beginning" but it contains some changes.

The most important change is involves what happens when items are deleted from the task list. Rather than looping through all the items in local storage and deleting any with matching text content (Brad's code) my script simply gets the index of the item that the user clicked on and deletes the coresponding index from local storage.

I also implemented a for...of loop for filtering the tasks, which was not in Brad's code. For loops are a bit more performant and we could break from the loop if we wanted to.

Things learned: 
1) increased familiarity with Materialize.css
2) increased knowledge of event delegation in JS
3) solving problems with using local storage (deleting only want we want)