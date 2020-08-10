# React Architecture
This is a small repository put together to show a possible react based project architecture.

The main point is to show how we can separate state from the UI components while
making data more available to all UI components. This drastically reduces the complexity of UI components
keeping them focused on how to display data instead of passing data to each other.

The goal is to leverage the advantages of declarative programming. We want to describe what the UI should
look like based on the state passed in and have state concerns dealt with outside the components.

# Main Components
These are the main components that make up this codes architecture. Keep in mind
these terms are some what arbitrary. Some people call them by different names, what
is important is the purpose and role of each component.

## Repository
The main role of the repository is to expose an API to the rest of the application. 
This API can be one to one to API from a server or database, but this doesn't 
always have to be the case. The main question you want to ask is what API do I want 
to expose to the rest of the application. This is where you have a chance to design 
how data is exposed to / consumed by the rest of the application. 

For example if this application uses the data from a server
in a simplified way, here we can remove complexity of the data. Ex: The server has
Individuals and Admins. An Admin is always an Individual. If the application doesn't
need to be concerned with the inheritance you can merge the data from both types and 
return it all as an Admin type. This will abstract away the Individual -> Admin hierarchy making the data easier to process for the UI.

Another example would be if we have data from two different servers. We can merge
data from multiple sources here into a single type for the rest of the application.

Another important aspect of repositories is they are usually responsible for one 
part of an API. For example if we have an API for clients that is composed of
their information, invoices and billing then we could create separate repositories 
for Clients, Invoices, and Billing. You can also create a Root Repository that holds
all the separate repositories. `clientsApi.invoicesRepo.getInvoices(clientId)`. 

## Store
The main role of the store is to hold all the global data for the application and
expose actions that can be run to modify the data.

In this repository Mobx is used for the store layer. This could also be redux.
You usually want to have a root store that exposes all the sub stores. Your store
will expose functions that we will call `actions` that can modify the data in the
store. These actions should call any repository functions needed. 


