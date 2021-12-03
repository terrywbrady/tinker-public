var FAApp = function(cb) {
    this.cb = cb;
    this.json = null;
    this.loadrules = async function(fname) {
        var data = await $.get(fname);
        this.json = jsyaml.load(data);
        var rules = this.json['rules'];
        if (rules == null) rules = [];
        console.log(rules);
        for(const r in rules) {
            var rule = rules[r];
            console.log(r);
            console.log(rule)
            this.cb(r, rule);
        }
    }
    this.loadrules("rule.yaml");
}