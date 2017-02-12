// Runs in the tab.

// Listen for a message from background (when a user clicks on the browser action)
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "clicked_browser_action" ) {
            console.log("loading default email filters...")
            var emailUrl = "https://mixpanel.com/report/projectId/explore/#list/filter:(conjunction:and,filters:!((dropdown_tab_index:1,filter:(operand:'',operator:'not%20set'),property:(name:'$marked_spam',no_second_icon:!t,source:user,type:datetime),selected_property_type:datetime,type:string),(dropdown_tab_index:1,filter:(operand:'',operator:'not%20set'),property:(name:'$unsubscribed',no_second_icon:!t,source:user,type:boolean),selected_property_type:boolean,type:string),(dropdown_tab_index:1,filter:(operand:!(bad-domain,bad-mailbox,inactive-mailbox,invalid-sender,policy-related,relaying-issues,routing-errors,spam-related),operator:'!!%3D'),property:(name:'$bounce_category',no_second_icon:!t,source:user,type:string),selected_property_type:string,type:string),(dropdown_tab_index:1,filter:(operand:'',operator:set),property:(name:'$email',no_second_icon:!t,source:user,type:string),selected_property_type:string,type:string))),sort_order:descending,sort_property:'$last_seen',sort_property_type:datetime";

            loadReport(emailUrl);

            function loadReport(url) {
                console.log(document.URL)
                var projectId = getProjectId(document.URL);

                url = url.replace("projectId",projectId);

                window.open(url,'_blank');

            }

            function getProjectId(url) {
                var projectId = url.split("/")[4];
                return projectId;
            }

        }
    }
);

