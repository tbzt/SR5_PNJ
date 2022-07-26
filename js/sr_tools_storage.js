var storage = {
	initialize_storage: function()
	{
		// Set up any expected things in localStorage
		localStorage.build_id = build_id;

		// // Cast of Shadows
		// What tab ID did we last create?
		localStorage.cast_tab_id = 1;

		// What character ID did we last create?
		localStorage.cast_character_id = 0;

		// What tab did we show last?
		// Start with the management tab, so new users see it at least once
		localStorage.cast_current_tab = 0;

		// What tabs are there?
		localStorage.cast_tabs = JSON.stringify([
			{
				tab_id: 1,
				name: 'Full Cast',
				order: 1,
				characters: [] // This is an array of {character_id, order} objects
			}
		]);

		// Save the characters
		localStorage.cast_characters = JSON.stringify([]);

		// Save a character template
		localStorage.cast_character_template = JSON.stringify({
			character_id: null,
			type: '',
			data: null
		});

		// Settings
		localStorage.setting_condition_monitor = 'combined';
		localStorage.setting_wound_penalty = '3';
	},

	// Return an array of tabs with their name, tab ID, and display ordering
	get_cast_tabs: function()
	{
		var stored_tabs = $.parseJSON(localStorage.cast_tabs);

		stored_tabs.forEach(function(tab)
		{
			tab.href = tab.name.replace(/( )/g, '_').replace(/\W/g, '');
		});

		stored_tabs.sort(function (a, b)
		{
			return a.order - b.order;
		});

		return stored_tabs;
	},

	// Return the currently displayed tab ID
	get_current_cast_tab: function()
	{
		return parseInt(localStorage.cast_current_tab);
	},

	// Set which tab we are viewing now
	set_current_cast_tab: function(id)
	{
		localStorage.cast_current_tab = id;
	},

	// Get information about a tab
	get_cast_tab: function(tab_id)
	{
		var stored_tabs = $.parseJSON(localStorage.cast_tabs), ret = null;

		stored_tabs.forEach(function(tab)
		{
			tab.href = tab.name.replace(/( )/g, '_').replace(/\W/g, '');
			if (tab.tab_id === tab_id)
				ret = tab;
		});

		if (ret === null)
			console.log('ERROR: get_cast_tab() unable to find specified tab', tab_id);

		return ret;
	},

	// Update a given tab, also for adding a new tab
	set_cast_tab: function(tab_id, tab_data)
	{
		// If the order isn't the same as the existing tabs, update other tabs to match?
		var stored_tabs = $.parseJSON(localStorage.cast_tabs);

		var lower_order, upper_order, change_direction = false;

		stored_tabs.forEach(function(tab)
		{
			if (tab_id === tab.tab_id)
			{
				if (tab_data.name != null && tab_data.name !== tab.name)
				{
					tab.name = tab_data.name;
				}

				if (tab_data.hasOwnProperty('characters') && tab_data.characters.length !== tab.characters.length)
					tab.characters = tab_data.characters;

				if (Number.isInteger(tab_data.order) && tab_data.order !== tab.order)
				{
					upper_order = Math.max(tab.order, tab_data.order);
					lower_order = Math.min(tab.order, tab_data.order);
					change_direction = (tab.order > tab_data.order) ? 1 : -1;
					tab.order = tab_data.order;
				}
			}
		});

		if (change_direction !== false)
		{
			stored_tabs.forEach(function(tab)
			{
				if (tab_id !== tab.tab_id && tab.order >= lower_order && tab.order <= upper_order)
				{
					tab.order += change_direction;
				}
			});
		}

		localStorage.cast_tabs = JSON.stringify(stored_tabs);
	},

	// Delete a given tab from storage
	delete_cast_tab: function(tab_id)
	{
		if (tab_id === 1)
			return;

		var stored_tabs = $.parseJSON(localStorage.cast_tabs), new_tabs = [];

		stored_tabs.forEach(function(tab)
		{
			if (tab.tab_id !== tab_id)
				new_tabs.push(tab);
		});

		localStorage.cast_tabs = JSON.stringify(new_tabs);
	},

	generate_character_id: function()
	{
		var id = parseInt(localStorage.cast_character_id) + 1;
		localStorage.cast_character_id = id;
		return id;
	},

	generate_cast_tab_id: function()
	{
		var id = parseInt(localStorage.cast_tab_id) + 1;
		localStorage.cast_tab_id = id;
		return id;
	},

	get_characters: function()
	{
		return $.parseJSON(localStorage.cast_characters);
	},

	get_character: function(id)
	{
		var character = null, all = this.get_characters();

		all.forEach(function(char)
		{
			if (id === char.character_id)
				character = char;
		});

		return character;
	},

	get_export_foundry: function(data)
	{
		var character = null;
		var magicType = "";
		var specialAttribute = "";
		var gender = "";
		var metatype = "";
		if (data.special.is_adept) {
			magicType = "Adept";
			specialAttribute = "magic"
		};
		if (data.special.is_mage) {
			magicType = "Magician";
			specialAttribute = "magic";
		};
		if (data.race) {
			switch(data.race) {
				case "Elfe":
					metatype = "elf";
				break;
				case "Humain":
					metatype = "human";
				break;
				case "Ork":
					metatype = "ork";
				break;
				case "Nain":
					metatype = "dwarf";
				break;
				case "Troll":
					metatype = "troll";
				break;
			}
		};
		if (data.gender) {
			switch(data.gender) {
				case "Homme":
					gender = "male";
				break;
				case "Femme":
					gender = "human";
				break;
			}
		};
			

		character = {
			"name": data.name,
			"type": "actorGrunt",
			"img": "systems/sr5/img/actors/actorGrunt.svg",
			"data": {
			  "attributes": {
				"body": {
				  "natural": {
					"base": data.attributes.body
				  }
				},
				"agility": {
				  "natural": {
					"base": data.attributes.agility
				  }
				},
				"reaction": {
				  "natural": {
					"base": data.attributes.reaction
				  }
				},
				"strength": {
				  "natural": {
					"base": data.attributes.strength
				  }
				},
				"willpower": {
				  "natural": {
					"base": data.attributes.will
				  }
				},
				"logic": {
				  "natural": {
					"base": data.attributes.logic
				  }
				},
				"intuition": {
				  "natural": {
					"base": data.attributes.intuition
				  }
				},
				"charisma": {
				  "natural": {
					"base": data.attributes.charisma
				  }
				}
			  },
			  "specialAttributes": {
				"magic": {
				  "natural": {
					"base": data.special.Magic || 0
				  },				  
				  "augmented": {
					"base": 0
				  }
				},
				"resonance": {
				  "natural": {
					"base": data.attributes.magic || 0
				  },				  
				  "augmented": {
					"base": 0
				  }
				},
				"edge": {
				  "natural": {
					"base": data.professional_rating || 0
				  },				  
				  "augmented": {
					"base": 0
				  }
				}
			  },
			  "skills": {
				"pilotAircraft": {
				  "rating": {
					"base": data.skills['Appareils volants'] || 0
				  }
				},
				"arcana": {
				  "rating": {
					"base": data.skills['Arcanes'] || 0
				  }
				},
				"automatics": {
				  "rating": {
					"base": data.skills['Armes à feu'] || 0
				  }
				},
				"heavyWeapons": {
				  "rating": {
					"base": data.skills['Armes lourdes'] || 0
				  }
				},
				"clubs": {
				  "rating": {
					"base": data.skills['Armes contondantes'] || 0
				  }
				},
				"throwingWeapons": {
				  "rating": {
					"base": data.skills['Armes de jet'] || 0
				  }
				},
				"gunnery": {
				  "rating": {
					"base": data.skills['Armes de véhicules'] || 0
				  }
				},
				"blades": {
				  "rating": {
					"base": data.skills['Armes tranchantes'] || 0
				  }
				},
				"banishing": {
				  "rating": {
					"base": data.skills['Bannissement'] || 0
				  }
				},
				"unarmedCombat": {
				  "rating": {
					"base": data.skills['Combat à mains nue'] || 0
				  }
				},
				"astralCombat": {
				  "rating": {
					"base": data.skills['Combat astral'] || 0
				  }
				},
				"counterspelling": {
				  "rating": {
					"base": data.skills['Contresort'] || 0
				  }
				},
				"running": {
				  "rating": {
					"base": data.skills['Course'] || 0
				  }
				},
				"cybercombat": {
				  "rating": {
					"base": data.skills['Cybercombat'] || 0
				  }
				},
				"disguise": {
				  "rating": {
					"base": data.skills['Déguisement'] || 0
				  }
				},
				"sneaking": {
				  "rating": {
					"base": data.skills['Discrétion'] || 0
				  }
				},
				"con": {
				  "rating": {
					"base": data.skills['Escroquerie'] || 0
				  }
				},
				"etiquette": {
				  "rating": {
					"base": data.skills['Etiquette'] || 0
				  }
				},
				"demolitions": {
				  "rating": {
					"base": data.skills['Explosifs'] || 0
				  }
				},
				"longarms": {
				  "rating": {
					"base": data.skills['Fusils'] || 0
				  }
				},
				"electronicWarfare": {
				  "rating": {
					"base": data.skills['Guerre électronique'] || 0
				  }
				},
				"gymnastics": {
				  "rating": {
					"base": data.skills['Gymnastique'] || 0
				  }
				},
				"hacking": {
				  "rating": {
					"base": data.skills['Hacking'] || 0
				  }
				},
				"impersonation": {
				  "rating": {
					"base": data.skills['Imposture'] || 0
				  }
				},
				"computer": {
				  "rating": {
					"base": data.skills['Informatique'] || 0
				  }
				},
				"intimidation": {
				  "rating": {
					"base": data.skills['Intimidation'] || 0
				  }
				},
				"summoning": {
				  "rating": {
					"base": data.skills['Invocation'] || 0
				  }
				},
				"spellcasting": {
				  "rating": {
					"base": data.skills['Lancement de sorts'] || 0
				  }
				},
				"leadership": {
				  "rating": {
					"base": data.skills['Leadership'] || 0
				  }
				},
				"binding": {
				  "rating": {
					"base": data.skills['Lien d\'esprits'] || 0
				  }
				},
				"software": {
				  "rating": {
					"base": data.skills['Logiciels'] || 0
				  }
				},
				"ritualSpellcasting": {
				  "rating": {
					"base": data.skills['Magie rituelle'] || 0
				  }
				},
				"hardware": {
				  "rating": {
					"base": data.skills['Matériel électronique'] || 0
				  }
				},
				"swimming": {
				  "rating": {
					"base": data.skills['Natation'] || 0
				  }
				},
				"negociation": {
				  "rating": {
					"base": data.skills['Négociation'] || 0
				  }
				},
				"assensing": {
				  "rating": {
					"base": data.skills['Observation astrale'] || 0
				  }
				},
				"navigation": {
				  "rating": {
					"base": data.skills['Orientation'] || 0
				  }
				},
				"perception": {
				  "rating": {
					"base": data.skills['Perception'] || 0
				  }
				},
				"tracking": {
				  "rating": {
					"base": data.skills['Pistage'] || 0
				  }
				},
				"pistols": {
				  "rating": {
					"base": data.skills['Pistolets'] || 0
				  }
				},
				"firstAid": {
				  "rating": {
					"base": data.skills['Premiers soins'] || 0
				  }
				},
				"pilotGroundCraft": {
				  "rating": {
					"base": data.skills['Véhicules terrestres'] || 0
				  }
				}
			  },
			  "magic": {
				"magicType": magicType
			  },
			  "conditionMonitors": {
				"stun": {
				  "base": 0,
				  "actual": {
					"base": 0
				  }
				},
				"physical": {
				  "base": 0,
				  "actual": {
					"base": 0
				  }
				},
				"edge": {
				  "base": data.professional_rating,
				  "actual": {
					"base": 0
				  }
				},
				"overflow": {
				  "base": 0,
				  "actual": {
					"base": 0
				  }
				}
			  },
			  "statusBars": {
				"stun": {
				  "value": 0,
				  "max": 0
				},
				"physical": {
				  "value": 0,
				  "max": 0
				},
				"edge": {
				  "value": 0,
				  "max": 0
				},
				"condition": {
				  "value": 0,
				  "max": 0
				},
				"matrix": {
				  "value": 0,
				  "max": 0
				},
				"overflow": {
				  "value": 0,
				  "max": 0
				}
			  },
			  "biography": {
				"characterMetatype": metatype,
				"description": data.notes || ""
			  },
			  "activeSpecialAttribute": specialAttribute
			},
			"items": [],
			"effects": [],
			"flags": {
			  "sr5": {
				"cumulativeDefense": null,
				"cumulativeRecoil": 3
			  },
			  "exportSource": {
				"world": "sr5",
				"system": "sr5",
				"coreVersion": "9.269",
				"systemVersion": "0.0.5.12"
			  }
			}
		  }
		return character;
	},

	set_character: function(data)
	{
		var cast_characters = $.parseJSON(localStorage.cast_characters), new_char = false;
		var updated_cast = [];

		if (!data.hasOwnProperty('character_id'))
		{
			new_char = true;
			data.character_id = this.generate_character_id();
		}

		if (new_char)
		{
			cast_characters.push(data);
			updated_cast = cast_characters;
		}
		else
		{
			cast_characters.forEach(function(char)
			{
				if (char.character_id === data.character_id)
					updated_cast.push(data);
				else
					updated_cast.push(char);
			});
		}

		localStorage.cast_characters = JSON.stringify(updated_cast);

		return data;
	},

	delete_character_from_tab: function(tab_id, character_id)
	{
		var tab_data = this.get_cast_tab(tab_id);

		tab_data.characters = tab_data.characters.filter(function(id)
		{
			return id !== character_id;
		});

		this.set_cast_tab(tab_id, tab_data);
	},

	delete_character: function(id)
	{
		var old_cast = $.parseJSON(localStorage.cast_characters), new_cast = [], i = 0;

		for (i; i < old_cast.length; i++)
		{
			if (id !== old_cast[i].character_id)
				new_cast.push(old_cast[i]);
		}

		localStorage.cast_characters = JSON.stringify(new_cast);

		var tabs = this.get_cast_tabs();

		tabs.forEach(function(tab)
		{
			storage.delete_character_from_tab(tab.tab_id, id);
		});
	},

	// Clone the character, optionally adding them to the same tabs as the original
	clone_character: function(id, clone_tabs)
	{
		var old_character = this.get_character(id), new_character, new_id;

		new_character = $.extend({}, old_character);
		delete new_character.character_id;

		// Change the name, either adding "Copy", or updating the copy #
		var copiedCharacter = new RegExp('.* Copy ([0-9])([0-9])');
		var copyTest = copiedCharacter.exec(new_character.name);

		if (copiedCharacter.test(new_character.name))
		{
			// Increment the copy number
			new_character.name = new_character.name.slice(0, -2);

			var newName = parseInt(copyTest[1]) * 10 + parseInt(copyTest[2]) + 1;

			if (newName < 10)
			{
				newName = '0' + newName;
			}

			new_character.name += newName;
		}
		else if (new_character.name.slice(-5) == ' Copy')
		{
			new_character.name += ' 01';
		}
		else
		{
			new_character.name += ' Copy';
		}

		new_character = this.set_character(new_character);
		new_id = new_character.character_id;

		if (clone_tabs === true) {
			var tabs = this.get_cast_tabs();

			tabs.forEach(function(tab)
			{
				var old_char_index = tab.characters.indexOf(id);

				if (tab.characters.includes(id))
				{
					tab.characters.splice(old_char_index + 1, 0, new_id);
					storage.set_cast_tab(tab.tab_id, tab);
				} 
			});
		}

		return new_character;
	},

	// Return the ID of the newly created tab
	create_cast_tab: function(tab_name)
	{
		// Find the highest tab ID now
		var tab_id = this.generate_cast_tab_id(), sort_order, stored_tabs = $.parseJSON(localStorage.cast_tabs);

		sort_order = stored_tabs.length + 1;

		stored_tabs.push({
			tab_id: tab_id,
			name: tab_name,
			order: sort_order,
			characters: []
		});

		localStorage.cast_tabs = JSON.stringify(stored_tabs);

		return tab_id;
	},

	// Get a specific setting
	// Note that actually changing settings is just left to the Settings tab
	setting: function(name)
	{
		if (localStorage.hasOwnProperty('setting_' + name))
		{
			return localStorage['setting_' + name];
		}
		else
		{
			return null;
		}
	}
};
