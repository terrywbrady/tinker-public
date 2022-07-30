class Rule {
    constructor(json) {
        this.name = json['name'] || "n/a";
        this.description = json['description'] || 'n/a'
    }
}

class FAApp {
    constructor() {
        this.yaml = "rule.yaml";
        this.json = null;
        this.farules = [];    
        this.defrule = {
            name: "n/a",
            description: "n/a"
        };
        this.rule = new Rule(this.defrule);
    }
    async loadrules() {
        var data = await $.get(this.yaml);
        this.json = jsyaml.load(data);
        this.farules = this.json['rules'];
        if (this.farules == null) this.farules = [];
    }
    loaded() {
        return this.json != null;
    }
    rules() {
        return this.farules;
    }
    setRule(r) {
        this.rule = new Rule(this.farules[r]);
    }
    getName() {
        return this.rule.name;
    }
    getDescription() {
        return this.rule.description;
    }
}

export default FAApp;