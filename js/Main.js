  var pax_number, pax_names=[], fax, email, segment_name=[], segment_dt=[], segment_cls=[], fop_list=[], cc_list= [];

      cc_list.push("CC1");
      cc_list.push("CC2");
      cc_list.push("CC3")

$(document).ready(function(){

	$("#btn_PNR").hide();
	$("#btn_Pricing").hide();
	$("#btn_FOP").hide();
	$("#create_script").hide();

	$("#btn_Pricing").click(function(){
		$("#Id_Pricing").toggle();
	});

	$("#btn_PNR").click(function(){
			$("#Id_PNR").toggle();
	});

	$("#btn_FOP").click(function(){
		$("#Id_FOP").toggle();
	});

	$("#btn_ITR").click(function(){
		$("#btn_PNR").toggle();
		$("#btn_Pricing").toggle();
		$("#btn_FOP").toggle();
		$("#create_script").toggle();
	});

	$("#pax_save").click(function(){
		pax_number= $("#pax_no").val();
		for (var i = 0; i < pax_number; i++) {
			pax_names.push("test/pax"+ i );
		};
		$("#modal_Pax").modal('hide');
	})

	$("#contact_save").click(function(){
		email= $("#email_id").val();
		fax= $("#fax_id").val();
		var atpos=email.indexOf("@");
		var dotpos=email.lastIndexOf(".");
		if(email=="")
		{
			$("#modal_Contact").modal('hide');
		}
		else if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length)
	    {
	  		alert("Not a valid e-mail address");
	  		return false;
	  	}
	  	else
	  	{
	  		$("#modal_Contact").modal('hide');
	  	}
		
	})

	$("#segment_add").click(function(){
		if ($("#segment_date").val()=="" || $("#segment_seg").val()=="" || $("#segment_class").val()=="")
		{
			alert("Enter all the required segment information");
			$("#segment_seg").focus();
		}
		else
		{
			segment_dt.push($("#segment_date").val())
			segment_name.push($("#segment_seg").val())
			segment_cls.push($("#segment_class").val())

			$("#segment_date").val("");
			$("#segment_seg").val("");
			$("#segment_class").val("");
			$("#segment_seg").focus();
		}
	})

	$("#create_script").click(function(){
			var start=0;
		for (var i = 0; i < pax_names.length; i++) {
			$("#txtarea").val($("#txtarea").val() + "nm1"+ pax_names[i] + "\n");
		};

		$("#txtarea").val($("#txtarea").val() + "tkok\n");
		$("#txtarea").val($("#txtarea").val() + "ap\n");
		if(email!="")
		{
		email= email+",";
		for (var i = 0; i < email.length; i++) {
			
			var email_char= email.charAt(i);
			if(email_char==',')
			{
				
				$("#txtarea").val($("#txtarea").val() + "ape-" + email.substring(start, i) + "\n");
				start=i+1;
				
			}

		};
		}
		start=0;
		if(fax!="")
		{
		fax= fax+",";
		for (var i = 0; i < fax.length; i++) {
			
			var fax_char= fax.charAt(i);
			if(fax_char==',')
			{
				
				$("#txtarea").val($("#txtarea").val() + "apf-" + email.substring(start, i) + "\n");
				start=i+1;
				
			}

		};
		}



		for (var i = 0; i < segment_name.length; i++) {
			$("#txtarea").val($("#txtarea").val() + "an" + segment_dt[i] + segment_name[i] + "\n" );
			$("#txtarea").val($("#txtarea").val() + "ss" + pax_names.length + segment_cls[i] + "1\n" );
		};

		for (var i = 0; i < fop_list.length; i++) {
			$("#txtarea").val($("#txtarea").val() + fop_list[i] + "\n" );
		};
	})
	$("#write_script").click(function(){
			
			var txt = new ActiveXObject("Scripting.FileSystemObject");

                var s = txt.CreateTextFile("D:\\11.txt", true);
                s.WriteLine('Hello');
                s.Close();


	})

	$("#fop_add").click(function(){
		var fop_temp="FP";
		var fop_check=0;
		if($("#fop_cash").val()==1)
		{
			fop_temp=fop_temp + "CASH";
			fop_check=fop_check+1;
		}
		if($("#fop_cc").val()!=0)
		{
			for(var i=0;i<$("#fop_cc").val();i++)
			{
				if(fop_check==0)
				{
					fop_temp=fop_temp + cc_list[i];
					fop_check=fop_check+1;
				}
				else
				{
					fop_temp=fop_temp + "+" + cc_list[i] + "/500";
					fop_check=fop_check+1;
				}

			}
		}
		if($("#fop_cheque").val()==1)
		{
			if(fop_check==0)
			{
				fop_temp=fop_temp+ "CHECK";
				fop_check= fop_check+1;
			}
			else
			{
				fop_temp=fop_temp+ "+CHECK\500";
			}
		}
		if($("#fop_pax").val()!="")
		{
			fop_temp=fop_temp + "\\P" + $("#fop_pax").val();
		}
		fop_list.push(fop_temp);

	})



});

