    $(document).ready(function() {
      $("img.rollover").hover(
        function() {
          this.src = this.src.replace("_off", "_on");
          this.src = this.src.replace("-off", "-on");
        },
        function() {
		  this.src = this.src.replace("_on", "_off");
          this.src = this.src.replace("-on", "-off");
        });
    });