import E from 'ember';

export default E.Controller.extend({
    fileTree: E.Object.create({
        "Budgeting": {
            "Enterprise Employees": [
                "Bills.pdf",
                "Cash Flow Tracker Worksheet.pdf",
                "Income and Expense Worksheet.pdf",
                "Intro for Presenter.pdf",
                "Keep It Safe.pdf",
                "Loan to Own.pdf",
                "Money Matters.pdf",
                "Pay Yourself First.pdf",
                "Your Own Home.pdf",
                "Spending Plan.pdf",
                "Spending Goals.pdf",
                "Maintaining the Budget.pdf",
                "Saving for Retirement.pdf",
                "Insurance.pdf",
                "Real Estate.pdf"
            ],
            "High School Students": [
                "Cash Flow Tracker Worksheet.pdf",
                "Income and Expense Worksheet.pdf",
                "Intro for Presenter.pdf",
                "Keep It Safe.pdf",
                "Money Matters.pdf",
                "Pay Yourself First.pdf",
                "Your Own Home.pdf",
                "Spending Plan.pdf",
                "Spending Goals.pdf",
                "Insurance.pdf"
            ],
            "People who are Homeless or Jobless": [
                "Bills.pdf",
                "Cash Flow Tracker Worksheet.pdf",
                "Income and Expense Worksheet.pdf",
                "Intro for Presenter.pdf",
                "Keep It Safe.pdf",
                "Loan to Own.pdf",
                "Money Matters.pdf",
                "Pay Yourself First.pdf",
                "Spending Plan.pdf",
                "Spending Goals.pdf",
                "Maintaining the Budget.pdf",
                "Saving for Retirement.pdf",
                "Insurance.pdf",
                "Real Estate.pdf"
            ]
        },
        "College": {
            "High School Students": [
                "Choosing a College.pdf",
                "Paying for College.pdf"
            ]
        },
        "Credit": {
            "Enterprise Employees": [
                "Charge It Right.pdf",
                "Credit Repair.pdf",
                "To Your Credit.pdf",
                "Credit Reports.pdf",
                "Credit Scores.pdf"
            ],
            "High School Students": [
                "Borrowing Basics.pdf",
                "To Your Credit.pdf",
                "Credit Reports.pdf",
                "Credit Scores.pdf"
            ]
        }
    }),
    selectedTopics: E.A(),
    demographicsTree: E.computed('selectedTopics.length', function () {
        let selectedTopics = this.get('selectedTopics');
        let fileTree = this.get('fileTree');
        let demographicsTree = E.Object.create();
        for (var key in fileTree) {
            if (fileTree.hasOwnProperty(key) && selectedTopics.includes(key)) {
                let value = fileTree.get(key);
                for (var subKey in value) {
                    if (value.hasOwnProperty(subKey)/* && value[subKey] !== undefined*/) {
                        if (demographicsTree.get(subKey) === undefined) {
                            demographicsTree.set(subKey, value[subKey]);
                        } else {
                            demographicsTree.get(subKey).addObjects(value[subKey]);
                        }
                    }
                }
            }
        }
        return demographicsTree;
    }),
    selectedDemographic: null,
    shouldShowStep2: E.computed.notEmpty('selectedTopics'),
    pdfNames: E.computed('selectedDemographic', 'demographicsTree', function () {
        let selectedDemographic = this.get('selectedDemographic');
        if (selectedDemographic !== undefined) {
            return this.get('demographicsTree').get(selectedDemographic);
        }
    }),
    shouldShowStep3: E.computed.notEmpty('selectedDemographic'),
    actions: {
        topicCheckboxDidChange(event) {
            let topic = event.target.name;
            let checked = event.target.checked;
            let selectedTopics = this.get('selectedTopics');
            if (checked) {
                selectedTopics.pushObject(topic);
            } else {
                selectedTopics.removeObject(topic);
            }
            if (selectedTopics.length === 0) { this.set('selectedDemographic', null); }
        },
        selectedDemographicDidChange(event) {
            let demographic = event.target.value;
            this.set('selectedDemographic', demographic);
        },
        doNothing() {}
    }
});
