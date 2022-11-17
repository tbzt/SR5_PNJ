var exportFoundry = {

    makeID: function(length) 
	{
		var result           = '';
		var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
		  result += characters.charAt(Math.floor(Math.random() * 
	 charactersLength));
	   }
	   return result;
	},

	get_export_foundry: function(data)
	{
		var character = null;
		var magicType = "";
		var specialAttribute = "";
		var gender = "";
		var metatype = "";
		var items = [];

		if (data.special.is_adept) {
			magicType = "adept";
			specialAttribute = "magic"
		};

		if (data.special.is_mage) {
			magicType = "magician";
			specialAttribute = "magic";

			tradition = {
				"_id": exportFoundry.makeID(16),
				  "name": "Hermétisme",
				  "type": "itemTradition",
				  "img": "systems/sr5/img/items/itemTradition.svg",
				  "system": {
					"systemEffects": [
					  {
						"category": "tradition",
						"value": "hermeticism"
					  }
					],
					"drainAttribute": "logic",
					"spiritCombat": "fire",
					"spiritDetection": "air",
					"spiritIllusion": "water",
					"spiritManipulation": "earth",
					"spiritHealth": "man",
					"possession": false
				},
			};

			items.push(tradition);

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

		if(data.weapons) {		

			data.weapons.forEach(function(weapon)
		{			
			w = exportFoundry.get_foundry_weapon(weapon);
			items.push(w);
		});

		};

		if(data.armor) {				
			a = exportFoundry.get_foundry_armor(data.armor);
			items.push(a);
		};

		if(data.gear) {
			
		};

		if(data.augmentations) {

			data.augmentations.forEach(function(augmentation)
            {		
				if (augmentation.augments) {
					console.log(augmentation.augments);
					/*
					augmentation.augments.forEach(function(acc)
					{			
						aug_acc = exportFoundry.get_foundry_augmentation(acc);
						console.log(aug_acc);
						items.push(aug_acc);
					});	
					*/
				}
				
                aug = exportFoundry.get_foundry_augmentation(augmentation);
                items.push(aug);

				
            });	
			
		};

		if(data.commlink) {
			
		};

		if(data.special.powers) {

			data.special.powers.forEach(function(power)
            {			
                ap = exportFoundry.get_foundry_power(power);
                items.push(ap);
            });
			
		};

		if(data.special.spells) {
            
            data.special.spells.forEach(function(spell)
            {			
                s = exportFoundry.get_foundry_spell(spell);
                items.push(s);
            });

		};

		if(data.qualities.positive || data.qualities.negative) {

			data.qualities.positive.forEach(function(positive)
            {			
                qp = exportFoundry.get_foundry_qualities(positive);
                items.push(qp);
            });
			data.qualities.negative.forEach(function(negative)
			{			
                qn = exportFoundry.get_foundry_qualities(negative);
                items.push(qn);
            });
			
		};


			
			

		character = {
			"name": data.name,
			"type": "actorGrunt",
			"img": "systems/sr5/img/actors/actorGrunt.svg",
			"system": {
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
				"magicType": magicType,
				"tradition": "",
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
			"prototypeToken": {
				"name": data.name,
				"displayName": 40,
    			"actorLink": false,
				"texture": {
				"src": "systems/sr5/img/actors/actorGrunt.svg",
				"scaleX": 1,
				"scaleY": 1,
				"offsetX": 0,
				"offsetY": 0,
				"rotation": 0,
				"tint": null
				},
				"width": 1,
				"height": 1,
				"lockRotation": true,
				"rotation": 0,
				"alpha": 1,
				"disposition": -1,
				"displayBars": 40,
				"bar1": {
				"attribute": "statusBars.physical"
				},
				"bar2": {
				"attribute": "statusBars.stun"
				},
				"light": {
				"alpha": 0.5,
				"angle": 360,
				"bright": 0,
				"color": null,
				"coloration": 1,
				"dim": 0,
				"attenuation": 0.5,
				"luminosity": 0.5,
				"saturation": 0,
				"contrast": 0,
				"shadows": 0,
				"animation": {
					"type": null,
					"speed": 5,
					"intensity": 5,
					"reverse": false
				},
				"darkness": {
					"min": 0,
					"max": 1
				}
				},
				"sight": {
				"enabled": true,
				"range": 100,
				"angle": 360,
				"visionMode": "basic",
				"color": null,
				"attenuation": 0.1,
				"brightness": 0,
				"saturation": 0,
				"contrast": 0
				},
				"detectionModes": [],
				"flags": {},
				"randomImg": false
			},
			"items": items,
			"effects": [],
			"flags": {},
			"_stats": {}
		  }
		return character;
	},

	get_foundry_weapon: function(weapon)
	{

		var category;
			var weaponSkill;
			var damageType;
			var armorPenetration; 
			var damageValue;
			var isStrengthBased = false;
			var accuracy;
			var reach;
			var damageElement;
			var singleShot = false;
			var semiAutomatic = false;
			var burstFire = false;
			var fullyAutomatic = false;
			var ammunition = 0;
			var recoilCompensation = 0;
			var type;
			var rangeIsStrengthBased = false, short, medium, long, extreme;


			switch(weapon) {
				case "Hache de combat":
					category = "meleeWeapon";
					weaponSkill = "blades";
					damageType = "physical";
					armorPenetration = -4;
					damageValue = 5;
					isStrengthBased = true;
					accuracy = 4;
					type = "blades";
				break;
				case "Couteau de combat":
					category = "meleeWeapon";
					weaponSkill = "blades";
					damageType = "physical";
					armorPenetration = -3;
					damageValue = 2;
					isStrengthBased = true;
					accuracy = 6;	
					type = "blades";
				break;				
				case "Couteau":
					category = "meleeWeapon";
					weaponSkill = "blades";
					damageType = "physical";
					armorPenetration = -1;
					damageValue = 1;
					isStrengthBased = true;
					accuracy = 5;
					type = "blades";
				break;
				case "Katana":
					category = "meleeWeapon";
					weaponSkill = "blades";
					damageType = "physical";
					armorPenetration = -3;
					damageValue = 3;
					isStrengthBased = true;
					accuracy = 7;
					reach = 1;
					type = "blades";
				break;
				case "Epée":
					category = "meleeWeapon";
					weaponSkill = "blades";
					damageType = "physical";
					armorPenetration = -2;
					damageValue = 3;
					isStrengthBased = true;
					accuracy = 6;
					reach = 1;
					type = "blades";
				break;				
				case "Griffes (retractable) implantées":
					category = "meleeWeapon";
					weaponSkill = "unarmedCombat";
					damageType = "physical";
					armorPenetration = -2;
					damageValue = 3;
					isStrengthBased = true;
					accuracy = 6;
					type = "exoticMeleeWeapon";
				break;				
				case "Massue":
					category = "meleeWeapon";
					weaponSkill = "clubs";
					damageType = "stun";
					armorPenetration = 0;
					damageValue = 3;
					isStrengthBased = true;
					accuracy = 4;
					reach = 1;
					type = "clubs";
				break;				
				case "Electromatraque":
					category = "meleeWeapon";
					weaponSkill = "clubs";
					damageType = "stun";
					armorPenetration = -5;
					damageValue = 9;
					accuracy = 4;
					reach = 1;
					damageElement = "electricity"
					type = "clubs";
				break;				
				case "Matraque":
					category = "meleeWeapon";
					weaponSkill = "clubs";
					damageType = "stun";
					armorPenetration = -2;
					damageValue = 3;
					isStrengthBased = true;
					accuracy = 6;
					reach = 1;
					type = "clubs";
				break;				
				case "Matraque téléscopique":
					category = "meleeWeapon";
					weaponSkill = "clubs";
					damageType = "stun";
					armorPenetration = -2;
					damageValue = 3;
					isStrengthBased = true;
					accuracy = 6;
					reach = 2;
					type = "clubs";
				break;				
				case "Defiance EX Shocker":
					category = "rangedWeapon";
					weaponSkill = "pistols";
					damageType = "stun";
					armorPenetration = -5;
					damageValue = 9;
					accuracy = 4;
					damageElement = "electricity";
					singleShot = true;
					ammunition = 4;
					type = "taser";
					short = 5;
					medium = 10;
					long = 15;
					extreme = 20;
				break;				
				case "Streetline Special":
					category = "rangedWeapon";
					weaponSkill = "pistols";
					damageType = "physical";
					armorPenetration = 0;
					damageValue = 6;
					accuracy = 4;
					semiAutomatic = true;
					ammunition = 6;
					type = "holdOut";
					short = 5;
					medium = 15;
					long = 30;
					extreme = 50;
				break;				
				case "Colt America L36":
					category = "rangedWeapon";
					weaponSkill = "pistols";
					damageType = "physical";
					armorPenetration = 0;
					damageValue = 7;
					accuracy = 7;
					semiAutomatic = true;
					ammunition = 11;
					type = "lightPistol";
					short = 5;
					medium = 15;
					long = 30;
					extreme = 50;
				break;				
				case "Fichetti Security 600":
					category = "rangedWeapon";
					weaponSkill = "pistols";
					damageType = "physical";
					armorPenetration = 0;
					damageValue = 7;
					accuracy = 6;
					semiAutomatic = true;
					ammunition = 30;
					type = "lightPistol";
					short = 5;
					medium = 15;
					long = 30;
					extreme = 50;
				break;				
				case "Ares Predator V":
					category = "rangedWeapon";
					weaponSkill = "pistols";
					damageType = "physical";
					armorPenetration = 0;
					damageValue = 8;
					accuracy = 5;
					semiAutomatic = true;
					ammunition = 15;
					type = "heavyPistol";
					short = 5;
					medium = 20;
					long = 40;
					extreme = 60;
				break;				
				case "Browning Ultra-Power":
					category = "rangedWeapon";
					weaponSkill = "pistols";
					damageType = "physical";
					armorPenetration = -1;
					damageValue = 8;
					accuracy = 5;
					semiAutomatic = true;
					ammunition = 10;
					type = "heavyPistol";
					short = 5;
					medium = 20;
					long = 40;
					extreme = 60;
				break;				
				case "Remington Roomsweeper":
					category = "rangedWeapon";
					weaponSkill = "pistols";
					damageType = "physical";
					armorPenetration = -1;
					damageValue = 7;
					accuracy = 8;
					ammunition = 8;
					type = "heavyPistol";
					short = 5;
					medium = 20;
					long = 40;
					extreme = 60;
				break;				
				case "Ceska Black Scorpion":
					category = "rangedWeapon";
					weaponSkill = "automatics";
					damageType = "physical";
					armorPenetration = 0;
					damageValue = 6;
					accuracy = 5;
					semiAutomatic = true;
					fullyAutomatic = true;
					ammunition = 35;
					type = "submachineGun";
					short = 5;
					medium = 15;
					long = 30;
					extreme = 50;
				break;				
				case "Steyr TMP":
					category = "rangedWeapon";
					weaponSkill = "automatics";
					damageType = "physical";
					armorPenetration = 0;
					damageValue = 7;
					accuracy = 4;
					semiAutomatic = true;
					fullyAutomatic = true;
					burstFire = true;
					ammunition = 30;
					type = "submachineGun";
					short = 5;
					medium = 15;
					long = 30;
					extreme = 50;
				break;				
				case "Colt Cobra TZ-120":
					category = "rangedWeapon";
					weaponSkill = "automatics";
					damageType = "physical";
					armorPenetration = 0;
					damageValue = 7;
					accuracy = 4;
					semiAutomatic = true;
					fullyAutomatic = true;
					burstFire = true;
					ammunition = 32;
					recoilCompensation = 2;
					type = "lightMachineGun";
					short = 10;
					medium = 40;
					long = 80;
					extreme = 150;
				break;				
				case "FN P93 Praetor":
					category = "rangedWeapon";
					weaponSkill = "automatics";
					damageType = "physical";
					armorPenetration = 0;
					damageValue = 8;
					accuracy = 6;
					semiAutomatic = true;
					fullyAutomatic = true;
					burstFire = true;
					ammunition = 50;
					recoilCompensation = 1;
					type = "lightMachineGun";
					short = 10;
					medium = 40;
					long = 80;
					extreme = 150;
				break;				
				case "HK-227":
					category = "rangedWeapon";
					weaponSkill = "automatics";
					damageType = "physical";
					armorPenetration = 0;
					damageValue = 7;
					accuracy = 5;
					semiAutomatic = true;
					fullyAutomatic = true;
					burstFire = true;
					ammunition = 28;
					recoilCompensation = 1;
					type = "lightMachineGun";
					short = 10;
					medium = 40;
					long = 80;
					extreme = 150;
				break;				
				case "AK-97":
					category = "rangedWeapon";
					weaponSkill = "automatics";
					damageType = "physical";
					armorPenetration = -2;
					damageValue = 10;
					accuracy = 5;
					semiAutomatic = true;
					fullyAutomatic = true;
					burstFire = true;
					ammunition = 38;
					type = "assaultRifle";
					short = 25;
					medium = 150;
					long = 350;
					extreme = 550;
				break;				
				case "Ares Alpha":
					category = "rangedWeapon";
					weaponSkill = "automatics";
					damageType = "physical";
					armorPenetration = -2;
					damageValue = 11;
					accuracy = 5;
					semiAutomatic = true;
					fullyAutomatic = true;
					burstFire = true;
					ammunition = 42;
					recoilCompensation = 2;
					type = "assaultRifle";
					short = 25;
					medium = 150;
					long = 350;
					extreme = 550;
				break;				
				case "FN HAR":
					category = "rangedWeapon";
					weaponSkill = "automatics";
					damageType = "physical";
					armorPenetration = -2;
					damageValue = 10;
					accuracy = 5;
					semiAutomatic = true;
					fullyAutomatic = true;
					burstFire = true;
					ammunition = 35;
					recoilCompensation = 2;
					type = "assaultRifle";
					short = 25;
					medium = 150;
					long = 350;
					extreme = 550;
				break;				
				case "HK-227":
					category = "rangedWeapon";
					weaponSkill = "automatics";
					damageType = "physical";
					armorPenetration = 0;
					damageValue = 7;
					accuracy = 5;
					semiAutomatic = true;
					fullyAutomatic = true;
					burstFire = true;
					ammunition = 6;
					recoilCompensation = 1;
					type = "lightMachineGun";
					short = 25;
					medium = 150;
					long = 350;
					extreme = 550;
				break;				
				case "Cavalier Arms Crockett EBR":
					category = "rangedWeapon";
					weaponSkill = "longarms";
					damageType = "physical";
					armorPenetration = -3;
					damageValue = 12;
					accuracy = 6;
					semiAutomatic = true;
					fullyAutomatic = true;
					ammunition = 20;
					recoilCompensation = 1;
					type = "sniperRifle";
					short = 50;
					medium = 350;
					long = 800;
					extreme = 1500;
				break;				
				case "Defiance T-250":
					category = "rangedWeapon";
					weaponSkill = "longarms";
					damageType = "physical";
					armorPenetration = -1;
					damageValue = 10;
					accuracy = 4;
					singleShot = true;
					semiAutomatic = true;
					ammunition = 5;
					type = "shotgun";
					short = 10;
					medium = 40;
					long = 80;
					extreme = 150;
				break;				
				case "Enfield AS-7":
					category = "rangedWeapon";
					weaponSkill = "longarms";
					damageType = "physical";
					armorPenetration = -1;
					damageValue = 13;
					accuracy = 4;
					semiAutomatic = true;
					fullyAutomatic = true;
					ammunition = 10;
					type = "shotgun";
					short = 10;
					medium = 40;
					long = 80;
					extreme = 150;
				break;				
				case "Ingram Valiant":
					category = "rangedWeapon";
					weaponSkill = "heavyWeapons";
					damageType = "physical";
					armorPenetration = -2;
					damageValue = 9;
					accuracy = 5;
					semiAutomatic = true;
					fullyAutomatic = true;
					ammunition = 50;
					type = "heavyMachineGun";
					short = 25;
					medium = 200;
					long = 400;
					extreme = 800;
				break;				
				case "Panther XXL":
					category = "rangedWeapon";
					weaponSkill = "heavyWeapons";
					damageType = "physical";
					armorPenetration = -6;
					damageValue = 17;
					accuracy = 5;
					singleShot = true;
					ammunition = 15;
					type = "heavyMachineGun";
					short = 50;
					medium = 300;
					long = 750;
					extreme = 1500;
				break;
			};

			w = {
			"_id": exportFoundry.makeID(16),
      		"name": weapon,
      		"type": "itemWeapon",
      		"img": "systems/sr5/img/items/itemWeapon.svg",
      		"system": {				
				"deviceRating": 2,
				"quantity": 1,
        		"category": category,				
				"type": type,
				"range": {
				  "short": {
					"value": 0,
					"base": short,
					"modifiers": []
				  },
				  "medium": {
					"value": 0,
					"base": medium,
					"modifiers": []
				  },
				  "long": {
					"value": 0,
					"base": long,
					"modifiers": []
				  },
				  "extreme": {
					"value": 0,
					"base": extreme,
					"modifiers": []
				  },
				  "isStrengthBased": rangeIsStrengthBased
				},
				"damageValue": {
				  "base": damageValue,
				  "modifiers": [],
				  "value": 0,
				  "isStrengthBased": isStrengthBased
				},
				"damageType": damageType,				
				"damageElement": damageElement || "",
				"armorPenetration": {
				  "base": armorPenetration,
				  "modifiers": [],
				  "value": 0
				},
				"accuracy": {
				  "base": accuracy,
				  "modifiers": [],
				  "value": 0,
				  "isPhysicalLimitBased": true
				},
				"reach": {
				  "value": 0,
				  "base": reach || 0,
				  "modifiers": []
				},
				"firingMode": {
				  "singleShot": singleShot,
				  "semiAutomatic": semiAutomatic,
				  "burstFire": burstFire,
				  "fullyAutomatic": fullyAutomatic,
				  "value": []
				},
				"ammunition": {
					"value": ammunition,
					"max": ammunition,
					"type": "",
					"casing": "",
					"rating": ""
				  },
				  "recoilCompensation": {
					"value": 0,
					"base": recoilCompensation,
					"modifiers": []
				  },
				"weaponSkill": {
					"dicePool": 0,
					"base": 0,
					"modifiers": [],					
					"specialization": false,
					"category": weaponSkill
				}
			},
		};

		return w;
	},

	get_foundry_armor: function(armor)
	{

		var armorValue;

			switch(armor) {
				case "Synthé-cuir":
					armorValue = 4;
				break;
				case "Vêtements pare-balles":
					armorValue = 6;
				break;
				case "Costume Actioneer":
					armorValue = 8;
				break;
				case "Manteau renforcé":
				case "Combinaison caméléon":
				case "Combinaison Urban Explorer":
					armorValue = 9;
				break;
				case "Gilet pare-balle":
					armorValue = 12;
				break;
				case "Armure corporelle intégrale":
					armorValue = 15;
				break;
				case "Armure corporelle intégrale avec casque et isolation chimique":
					armorValue = 18;
				break;
			};

			a = {
			"_id": exportFoundry.makeID(16),
      		"name": armor,
      		"type": "itemArmor",
      		"img": "systems/sr5/img/items/itemArmor.svg",
      		"system": {				
				"deviceRating": 2,
				"quantity": 1,				
				"isActive": true,
				"armorValue": {
				  "value": 0,
				  "base": armorValue,
				  "modifiers": []
				}
			},
		};

		return a;
	},

    get_foundry_spell: function(spell)
	{

		var gameEffect = "", damageType = "", damageElement = "", category, subCategory, range, duration, type, drain = 0, illusionSense = "", detectionSense = "", defenseFirstAttribute = "", defenseSecondAttribute = "", resisted = false, customEffects = [], healthEssence = false;

			switch(spell) {
				case "Foudre":
					gameEffect = "<p>Ces sorts créent et dirigent de vicieuses projections d'électricité, faisant ainsi des dégâts électriques (p. 172).</p>";
                    damageType = "physical";
                    damageElement = "electricity";
                    category = "combat";
                    subCategory = "indirect";
                    range = "lineOfSight";
                    duration = "instantaneous";
                    type = "physical";
                    drain = -3;
				break;
				case "Silence":
					gameEffect = "<p>Ce sort crée une zone qui amortit les sons.</p>\n<p>Les attaques soniques portées à l’intérieur de la zone ou en provenance de l’extérieur, ainsi que les pouvoirs de créatures utilisant les sons comme vecteur, comme Hurlement paralysant, sont réduites de 1 par succès du test de Lancement de sorts.</p>\n<p>Toute personne tentant d’entendre un son produit dans la zone du sort ou la traversant doit résister avec succès au sort.</p>\n<p>Silence est un sort mana et n’affecte donc que les êtres vivants et les attaques soniques magiques.</p>";
                    category = "illusion";
                    subCategory = "realistic";
                    range = "area";
                    duration = "sustained";
                    type = "mana";
                    drain = -2;
                    illusionSense = "single";
                    defenseFirstAttribute = "logic";
                    defenseSecondAttribute = "willpower";
                    resisted = true;
				break;
				case "Boule étourdissante":
					gameEffect = "<p>Ce sort canalise un pouvoir magique destructeur directement dans les cibles, causant des dommages étourdissants. On le désigne parfois comme un sort de « sommeil » car il peut rendre ses cibles inconscientes, sans les tuer, dans les cas où l’on préfère une violence plus retenue.</p>";
                    damageType = "stun";
                    category = "combat";
                    subCategory = "direct";
                    range = "area";
                    duration = "instantaneous";
                    type = "mana";
				break;
				case "Armure":
					gameEffect = "<p>Ce sort crée un champ d’énergie magique étincelante autour du sujet qui le protège contre les dommages physiques.</p>\n<p>Fournit un indice d’Armure égal aux succès lors du test de Lancement de sorts et se cumule avec toute autre armure, sans être toutefois inclus dans les calculs de détermination d’encombrement de l’armure.</p>";
                    customEffects = { "0": { "category": "itemArmor", "target": "system.itemsProperties.armor", "type": "hits", "multiplier": 1, "transfer": true, "wifi": false } };
                    category = "manipulation";
                    subCategory = "physical";
                    range = "lineOfSight";
                    duration = "sustained";
                    type = "physical";
                    drain = -2;
                    defenseFirstAttribute = "strength";
                    defenseSecondAttribute = "body";
				break;
				case "Agonie":
					gameEffect = "<p>Favori des magiciens traversant des moments difficiles, Agonie inflige à une cible l'illusion d'une terrible douleur.</p>\n<p>Chaque succès excédentaire du magicien inflige temporairement une case de dommages physiques et une case de dommages étourdissants.</p>\n<p>Ce ne sont pas des dégâts réels, seulement une mesure de l’effet du sort. La cible est affectée de la même manière que par des dégâts réels, recevant les pénalités de blessures habituelles.</p>\n<p>Si un moniteur de condition de la cible est complètement rempli, elle est submergée de douleur, incapable de se déplacer ou d’agir.</p>\n<p>Une fois que le sort s’achève, la douleur et les cases de dégâts disparaissent immédiatement.</p>\n<p>Agonie affecte une seule cible.</p>";
                    customEffects = { "0": { "category": "characterConditionMonitors", "system": "system.conditionMonitors.stun.actual", "type": "netHits", "multiplier": 1, "wifi": false, "transfer": true }, "1": { "category": "characterConditionMonitors", "target": "system.conditionMonitors.condition.actual", "type": "netHits", "multiplier": 1, "wifi": false, "transfer": true }, "2": { "category": "characterConditionMonitors", "target": "system.conditionMonitors.physical.actual", "type": "netHits", "multiplier": 1, "wifi": false, "transfer": true } };
                    category = "illusion";
                    subCategory = "realistic";
                    range = "lineOfSight";
                    duration = "sustained";
                    type = "mana";
                    drain = -4;
                    illusionSense = "single";
                    resisted = true;
                    defenseFirstAttribute = "logic";
                    defenseSecondAttribute = "willpower";
				break;
				case "Clairvoyance":
					gameEffect = "<p>Le sujet peut voir des scènes distantes comme s'il était physiquement présent à un point choisi à portée sensorielle du sort.</p>\n<p>Le point d’observation peut être déplacé vers un autre point de l’espace à portée en une action complexe.</p>\n<p>Tandis qu’il utilise Clairvoyance, le sujet ne peut pas utiliser sa vision normale et sa perception astrale.</p>\n<p>Le sort ne traduit pas de sons, seulement la vision, dans le spectre visuel naturel du sujet, la vision augmentée ne s’appliquant pas.</p>\n<p>Il n’est pas possible de cibler des sorts par l’intermédiaire de Clairvoyance.</p>";
                    category = "detection";
                    subCategory = "directional";
                    range = "touch";
                    duration = "sustained";
                    type = "mana";
                    drain = -3;
                    detectionSense = "passive";
				break;
				case "Invisibilité physique":
					gameEffect = "<p>Ce sort rend la détection du sujet plus difficile par les sens visuels normaux, qu'il s'agisse des visions thermographique et nocturne et des autres sens dépendant du spectre visuel. Le sujet reste complètement tangible et détectable par les autres sens, qu'il s'agisse de l'ouïe, de l'odorat, du toucher ou même du goût si cela devait en arriver là. Son aura est également toujours visible à la perception astrale.</p>\n<p>Tout individu en position de percevoir le sujet doit d’abord résister avec succès au sort.</p>\n<p>Le magicien fait un seul test de Lancement de sorts et utilise ses succès comme seuil pour quiconque doit y résister ultérieurement.</p>\n<p>Même si l’on résiste au sort, le sujet reste indétectable s’il a fait un test de Discrétion suffisamment bon.</p>\n<p>Un personnage invisible peut toujours être détecté par des moyens non visuels, comme l’odorat et l’ouïe.</p>\n<p>Les attaques contre les cibles invisibles subissent le modificateur de tir au jugé si l’attaquant est incapable de voir ou de localiser d’une manière ou d’une autre le sujet du sort.</p>\n<p>Invisibilité physique imite l’environnement du sujet selon tous les angles possibles et affecte également les senseurs technologiques.</p>";
                    category = "illusion";
                    subCategory = "realistic";
                    range = "lineOfSight";
                    duration = "sustained";
                    type = "physical";
                    drain = -1;
                    illusionSense = "single";
                    resisted = true;
                    defenseFirstAttribute = "logic";
                    defenseSecondAttribute = "intuition";                    
				break;
				case "Augmentation de réflexes":
					gameEffect = "<p>Ce sort augmente l’initiative d’un sujet.</p><p>\n<p>Chaque succès du test de Lancement de sorts ajoute 1 à l’Initiative de la cible, et chaque paire de succès ajoute un dé d’Initiative.</p>\n<p>Un personnage ne peut être affecté que par un seul sort d’Augmentation de réflexes à la fois, et le nombre maximum de dés d’Initiative que peut avoir un personnage est égal à 5D6.</p>";
                    customEffects = { "0": { "category": "characterInitiatives", "target": "system.initiatives.physicalInit", "type": "hits", "multiplier": 1, "transfer": true }, "1": { "category": "characterInitiatives", "target": "system.initiatives.physicalInit.dice", "type": "hits", "multiplier": 0.5, "transfer": true } };
                    category = "health";
                    subCategory = "";
                    range = "touch";
                    duration = "sustained";
                    type = "physical";
                    healthEssence = true;
				break;
				case "Sens du combat":
					gameEffect = "<p>Le sujet peut analyser les combats et autres situations dangereuses à portée, ressentant les événements une fraction de seconde avant qu'ils ne surviennent.</p>\n<p>Chaque succès du test de Lancement de sorts ajoute 1 dé à la Réaction lors des tests de surprise, et aussi aux jets faits pour se défendre contre les attaques de mêlée et à distance tant que le sort fait effet.</p>\n<p>Les bonus retirés de ce sort et du pouvoir d’adepte éponyme ne sont que partiellement cumulables, seul le meilleur modificateur de défense est retenu, cependant un personnage affecté par ces deux effets peut bénéficier du test de Perception et du modificateur de Réaction pour son test de Surprise, le cas échéant.</p>";
                    customEffects = { "0": { "category": "characterDerivedAttributes", "target": "system.derivedAttributes.surprise", "type": "hits", "multiplier": 1, "transfer": true }, "1": { "category": "characterDefenses", "target": "system.defenses.defend", "type": "hits", "multiplier": 1, "transfer": true } };
                    category = "detection";
                    subCategory = "psychic";
                    range = "touch";
                    duration = "sustained";
                    type = "mana";
                    drain = -1;
                    detectionSense = "passive";
				break;
				case "Soins":
					gameEffect = "<p>Soins répare les blessures physiques, à concurrence d’un nombre de cases de dommages physiques égal aux succès du magicien au test de Lancement de sorts.</p>\n<p>Les succès peuvent également être utilisés pour diminuer le temps de base pour rendre les effets permanents : chaque succès utilisé de cette manière retirant 1 tour de combat à cette durée.</p>\n<p>Il est évidemment possible de répartir les succès entre soins et diminution de cette durée de latence.</p>\n<p>Tous les dommages physiques persistant chez la cible après qu’elle ait été soignée magiquement ne peuvent être soignés que par du temps et du repos.</p>";
                    customEffects = { "0": { "category": "characterConditionMonitors", "wifi": false, "transfer": true, "target": "physical.removeDamage", "type": "hits", "multiplier": 1 } };
                    category = "health";
                    subCategory = "";
                    range = "touch";
                    duration = "permanent";
                    type = "physical";
                    drain = -4;
                    healthEssence = true;
				break;
				case "Détection de la vie":
					gameEffect = "<p>Le sujet détecte les êtres vivants (mais pas les esprits) à portée de sens, et connaît leur nombre et leur position relative.</p>\n<p>S'il y a foule dans la zone, le sort est virtuellement inutile, car il ne détecte qu'une masse floue de traces de vie.</p>";
                    category = "detection";
                    subCategory = "aeraEffect";
                    range = "touch";
                    duration = "sustained";
                    type = "mana";
                    drain = -3;
                    detectionSense = "active";
                    resisted = true;
                    defenseFirstAttribute = "logic";
                    defenseSecondAttribute = "willpower";
				break;
				case "Barrière physique":
					gameEffect = "<p>Ce sort crée un champ de force translucide et étincelant doté d'un point d'Armure et de Structure par succès.</p>\n<p>Il est possible de former une barrière en forme de dôme d’un rayon (et donc d’une hauteur) maximal égal au rayon normal du sort.</p>\n<p>Il est aussi possible de créer un mur d’une hauteur maximale égale à la Puissance du sort et d’une longueur maximale égale au double de cette Puissance.</p>\n<p>Tout ce qui fait la taille d’une molécule ou moins peut traverser celui-ci, ce qui inclut l’air et les autres gaz.</p>\n<p>Tout ce qui est plus grand interagit avec la barrière comme si c’était un mur physique normal.</p>\n<p>Le mur est transparent mais scintillant, l’équivalent d’un brouillard léger (p. 176).</p>\n<p>La barrière ne gêne pas le lancement de sorts en dehors des modificateurs de visibilité, à l’exception des sorts qui ont une composante physique comme les sorts de Combat indirects.</p>\n<p>La barrière peut être altérée par les attaques physiques, mais tant qu’elle est maintenue, elle régénérera l’intégralité de son indice de Structure au début de chaque tour de combat.</p>\n<p>Cependant, si cette Structure est réduite à 0, elle est abattue et le sort prend fin.</p>";
                    category = "manipulation";
                    subCategory = "environmental";
                    range = "area";
                    duration = "sustained";
                    type = "mana";
                    drain = -2;
                    illusionSense = "single";
                    detectionSense = "active";
				break;
				case "Frappe à distance":
					gameEffect = "<p>Ce sort frappe la ou les cibles d'une force psychokinésique invisible, similaire à un coup de poing puissant, qui inflige des dommages étourdissants.</p>";
                    damageType = "stun";
                    category = "combat";
                    subCategory = "indirect";
                    range = "lineOfSight";
                    duration = "instantaneous";
                    type = "physical";
                    drain = -3;
				break;
				case "Lance de glace":
					gameEffect = "Eclats de glace d'une efficacité redoutable qui causent des dommages dus au froid (p. 172, SR5). Cela peut causer des dommages inhabituels à certaines créatures et endommager les armures ou l’équipement. Les armures avec les modifications protection thermique, protection ou isolation chimique peuvent protéger contre les dommages de ces sorts (voir p. 439, SR5).";
                    damageType = "physical";
                    damageElement = "cold";
                    category = "combat";
                    subCategory = "indirect";
                    range = "lineOfSight";
                    duration = "instantaneous";
                    type = "physical";
                    drain = -3;
				break;
				case "Boule de foudre":
					gameEffect = "<p>Ce sort cré et dirige de vicieuses projections d'électricité, faisant ainsi des dégâts électriques (p. 172).</p>\n<p>En tant qu'énergies physiques, il peut affecter à la fois les cibles vivantes et inanimées, et l'on y résiste avec sa Constitution.</p>";
                    damageType = "physical";
                    damageElement = "electricity";
                    category = "combat";
                    subCategory = "indirect";
                    range = "area";
                    duration = "instantaneous";
                    type = "physical";
                    drain = -1;
				break;
				case "Lien mental":
					gameEffect = "<p>Lien mental permet au magicien et à un sujet volontaire de communiquer mentalement, échangeant des conversations, des émotions, et des images mentales.</p>\n<p>Un succès sur le test de Lancement de sorts suffit pour établir le lien.</p>\n<p>Le sujet doit rester à portée standard du magicien pour qu’opère le Lien mental.</p>";
                    category = "detection";
                    subCategory = "psychic";
                    range = "touch";
                    duration = "sustained";
                    type = "mana";
                    drain = -1;
                    detectionSense = "active";
                    defenseFirstAttribute = "logic";
                    defenseSecondAttribute = "willpower";
				break;
				case "Confusion":
					gameEffect = "<p>Ce sort produit un tourbillon de sensations contradictoires et d'images pour perturber les sens.</p>\n<p>Pour chaque succès excédentaire du test de Lancement de sorts, la cible subit un modificateur de réserve de dés de -1 sur tous ses tests à cause de la distraction.</p>";
                    customEffects = { "0": { "category": "penaltyTypes", "wifi": false, "transfer": true, "target": "system.penalties.special.actual", "type": "netHits", "multiplier": -1 } };
                    category = "illusion";
                    subCategory = "realistic";
                    range = "lineOfSight";
                    duration = "sustained";
                    type = "mana";
                    drain = -3;
                    illusionSense = "multi";
                    resisted = true;
                    defenseFirstAttribute = "logic";
                    defenseSecondAttribute = "willpower";
				break;
				case "Contrôle des pensées":
					gameEffect = "<p>Le magicien prend le contrôle des esprits de ses cibles dirigeant tout ce qu'elles pensent.</p>\n<p>Le magicien leur donne des ordres mentaux avec une action complexe, et elles sont forcées d'obéir comme si c'était leur propre idée.</p>";
                    category = "manipulation";
                    subCategory = "mental";
                    range = "lineOfSight";
                    duration = "sustained";
                    type = "mana";
                    drain = -1;
                    resisted = true;
                    defenseFirstAttribute = "logic";
                    defenseSecondAttribute = "willpower";
				break;
				case "Fantasme tridéo":
					gameEffect = "<p>Ce sort de zone crée des illusions convaincantes représentant tout objet, créature ou scène désirés par le magicien. Celui-ci peut reproduire à peu près n'importe quoi qu'il a observé auparavant, qu'il s'agisse d'une fleur ou d'un créditube, en passant par un dragon crachant du feu, tant que l'illusion ne dépasse pas la taille de la zone d'effet du sort.</p>\n<p>Toute personne en mesure de percer l’illusion à jour doit d’abord résister avec succès au sort.</p>\n<p>Le magicien fait un seul test de Lancement de sorts et utilise ses succès comme seuil pour quiconque doit y résister ultérieurement.</p>\n<p>Fantasme tridéo affecte les êtres vivants et les senseurs technologiques.</p>";
                    damageType = "stun";
                    category = "illusion";
                    subCategory = "realistic";
                    range = "area";
                    duration = "sustained";
                    type = "physical";
                    illusionSense = "multi";
                    resisted = true;
                    defenseFirstAttribute = "logic";
                    defenseSecondAttribute = "intuition";
				break;
				case "Détection de la magie":
					gameEffect = "<p>Le sujet détecte la présence de tous les focus, sorts, runes, loges magiques, préparations alchimiques, rituels actifs, et esprits à portée de sens.</p><p>Il n'est d'aucune utilité pour repérer les personnages ou créatures éveillés, les signatures astrales, les préparations alchimiques qui ont expiré ou qui ont déjà été déclenchées (le sort rattaché ayant cessé), ou les effets des sorts permanents une fois qu'ils sont devenus permanents.</p>";
                    category = "detection";
                    subCategory = "aeraEffect";
                    range = "touch";
                    duration = "sustained";
                    type = "mana";
                    drain = -2;
                    detectionSense = "active";
                    resisted = true;
                    defenseFirstAttribute = "logic";
                    defenseSecondAttribute = "willpower";
				break;
				case "Invisibilité":
					gameEffect = "<p>Ce sort rend la détection du sujet plus difficile par les sens visuels normaux, qu'il s'agisse des visions thermographique et nocturne et des autres sens dépendant du spectre visuel. Le sujet reste complètement tangible et détectable par les autres sens, qu'il s'agisse de l'ouïe, de l'odorat, du toucher ou même du goût si cela devait en arriver là. Son aura est également toujours visible à la perception astrale.</p>\n<p>Tout individu en position de percevoir le sujet doit d’abord résister avec succès au sort.</p>\n<p>Le magicien fait un seul test de Lancement de sorts et utilise ses succès comme seuil pour quiconque doit y résister ultérieurement.</p>\n<p>Même si l’on résiste au sort, le sujet reste indétectable s’il a fait un test de Discrétion suffisamment bon.</p>\n<p>Un personnage invisible peut toujours être détecté par des moyens non visuels, comme l’odorat et l’ouïe.</p>\n<p>Les attaques contre les cibles invisibles subissent le modificateur de tir au jugé si l’attaquant est incapable de voir ou de localiser d’une manière ou d’une autre le sujet du sort.</p>";
                    category = "illusion";
                    subCategory = "realistic";
                    range = "lineOfSight";
                    duration = "sustained";
                    type = "mana";
                    drain = -2;
                    illusionSense = "single";
                    resisted = true;
                    defenseFirstAttribute = "logic";
                    defenseSecondAttribute = "willpower";
				break;
			};

			s = {
			"_id": exportFoundry.makeID(16),
      		"name": spell,
      		"type": "itemSpell",
      		"img": "systems/sr5/img/items/itemSpell.svg",
      		"system": {	
                "gameEffect": gameEffect,
                "customEffects": customEffects,
                "itemEffects": [],
                "systemEffects": [],
                "damageValue": {
                  "base": 0,
                  "modifiers": [],
                  "value": 0,
                  "isStrengthBased": false
                },
                "damageType": damageType,
                "damageElement": damageElement,
                "armorPenetration": {
                  "base": 0,
                  "modifiers": [],
                  "value": 0
                },
                "accuracy": {
                  "base": 0,
                  "modifiers": [],
                  "value": 0,
                  "isPhysicalLimitBased": false
                },
                "category": category,
                "subCategory": subCategory,
                "range": range,
                "duration": duration,
                "type": type,
                "drain": {
                  "value": 0,
                  "base": drain,
                  "modifiers": []
                },
                "drainValue": {
                  "value": 0,
                  "base": 0,
                  "modifiers": []
                },
                "manipulationDamaging": false,
                "illusionSense": illusionSense,
                "detectionSense": detectionSense,
                "healthEssence": healthEssence,
                "freeSustain": false,
                "resisted": resisted,
                "defenseFirstAttribute": defenseFirstAttribute,
                "defenseSecondAttribute": defenseSecondAttribute,              
			},
            "effects": []
		};

		return s;
	},

	get_foundry_qualities: function(quality)
	{

		var gameEffect = "", description = "", systemEffects = [], customEffects = [], itemEffects = [], itemRating = 0, type;

			switch(quality) {
				case "Ambidextre":
					description = "<p>Le personnage Ambidextre peut manipuler des objets avec l’une ou l’autre main indifféremment.</p>"
					gameEffect = "<p>Sans cet avantage, toute action accomplie uniquement avec la mauvaise main (comme tirer avec une arme) subit un modificateur de réserve de dés de -2 (voir Arme dans la mauvaise main, p. 179).</p>";
					type = "positive";
				break;
				case "Esprit analytique":
					description = "<p>Esprit analytique décrit la capacité unique à analyser logiquement des informations, à déduire des solutions à des problèmes ou à distinguer les informations vitales des distractions et du bruit.</p>\n<p>Cet Avantage est utile pour casser des codes, résoudre des énigmes, éviter des pièges ou encore passer des données au crible.</p>";
					gameEffect = "<p>Ce trait confère au personnage un modificateur de réserve de dés de +2 pour tout test basé sur la Logique concernant la reconnaissance de motifs, l’analyse d’une preuve, la recherche d’indices ou la résolution d’énigmes. Cet avantage réduit également de moitié le temps nécessaire au personnage pour résoudre un problème.</p>";
					type = "positive";
				break;
				case "Caméléon astral":
					description = "<p>La signature astrale d’un personnage doté du trait Caméléon astral se fond rapidement dans l’espace astral et s’avère difficile à détecter.</p>\n<p>Seuls les personnages dotés d’un attribut Magie et capables de laisser des signatures astrales peuvent avoir ce trait.</p>"
					gameEffect = "<p>Toutes les signatures laissées par lepersonnage disparaissent deux fois plus vite et quiconque tente de repérer la signature astrale subit un modificateur de -2 à sa réserve de dés.</p>";
					type = "positive";
				break;
				case "M. Tout le monde":
					description = "<p>Le personnage se fond dans la foule : il est rarement remarqué et facilement oublié. Son apparence est ordinaire et il n'a ni caractéristiques physiques ni comportements distinctifs. Quiconque tente de le décrire n'arrive pas à en dire quelque chose de plus précis que \"taille moyenne, corpulence moyenne, chevelure moyenne, etc.\"</p>\n<p>Si le personnage se retrouve avec un tatouage, une cicatrice ou un implant visible, ou tout autre signe distinctif, les bonus de l'Avantage M. Tout le monde sont annulés jusqu'à ce que les signes distinctifs disparaissent de l'apparence du personnage.</p>\n<p>Dans certaines circonstances ou situations, le meneur de jeu peut décider que l'Avantage ne s'applique pas. Par exemple, un troll avec l'Avantage M. Tout le monde continue à dépasser de plusieurs têtes une foule d'humains et se repère donc de loin, peu importe à quel point ses cornes sont moyennes. Le personnage ne regagne ses bonus qu'en s'extrayant de la situation où il détonne.</p>"
					gameEffect = "<p>L'Avantage M. Tout le monde augmente le seuil de 1 de quiconque tente de se rappeler de détails concernant le personnage.</p><p>Les personnes qui tentent de filer le personnage ou de le localiser physiquement par le biais de leurs contacts ou même de le repérer au milieu d'une foule reçoivent un modificateur de -2 à leur réserve de dés à tous les tests réalisés lors de ces tentatives. Le même modificateur s'applique si les personnes demandent autour d'elles des informations sur le personnage sur la base de sa description physique. Ce modificateur ne s'applique pas, cependant, aux recherches magiques ou matricielles.</p>";
					type = "positive";
					customEffects = { "0": { "category": "reputationTypes", "target": "system.notoriety", "type": "value", "value": -1, "multiplier": 1, "wifi": false, "transfer": false } };
				break;
				case "Fou du volant":
					description = "<p>Le Fou du volant est celui que vous cherchez quand il est temps d’appuyer sur le champignon et de filer. C’est un conducteur ou un pilote né. Une fois installé derrière le volant / le manche / les manettes d’un véhicule ou d’un drone, il a une compréhension intuitive des limites et des capacités dudit véhicule, et sait comment cajoler la machine qu’il contrôle pour qu’elle fonctionne à son maximum.</p>\n<p>Le joueur peut faire durer ce bonus 1D6 minutes supplémentaires s’il le souhaite. Ce choix pousse le véhicule ou le drone bien au-delà des limites de sa conception et entraîne un risque de dommages catastrophiques. Pour chaque minute pendant laquelle le personnage pousse le véhicule au-delà de la durée initiale du bonus, le véhicule encaisse automatiquement (pas de résistance) une case de dommages.</p>"
					gameEffect = "<p>Pendant un combat de véhicules ou une course-poursuite, un Fou du volant peut augmenter la Vitesse ou la Maniabilité du véhicule ou du drone (au choix du joueur) de +1 pendant 1D6 minutes. Il bénéficie en outre d’un modificateur de réserve de dés de +2 quand il se livre à des manoeuvres difficiles ou à des cascades avec le véhicule. Ce bonus dure pendant 1D6 minutes.</p>";
					type = "positive";
				break;
				case "Tripes":
					description = "<p>Quand un esprit insecte aux mandibules dégoulinantes charge, le personnage avec l’Avantage Tripes est celui qui a le plus de chance de tenir et se battre au lieu de paniquer.</p>"
					gameEffect = "<p>Tripes procure au personnage un modificateur de réserve de dés de +2 aux tests pour résister à la peur et à l’intimidation, y compris induites magiquement par des sorts ou des pouvoirs de métacréatures.</p>";
					type = "positive";
					customEffects = { "0": { "category": "characterDerivedAttributes", "target": "system.derivedAttributes.composure", "type": "value", "value": 2, "multiplier": null } };
				break;
				case "Apparence humaine":
					description = "<p>Un métahumain disposant du trait Apparence humaine peut passer pour un humain la plupart du temps. Les PNJ humains ont une attitude neutre envers un tel personnage lors de ses tests de compétences sociales (voir p. 86), même s'ils ont de gros préjugés envers les métahumains.</p>\n<p>Il se peut que le personnage subisse l'antipathie de PNJ métahumains qui n'aiment pas les humains et qui, soit le prennent pour un humain, soit pensent que ses motivations pour essayer d'avoir l'air humain sont louches.</p>\n<p>Seuls les elfes, les nains et les orks peuvent prendre le trait Apparence humaine.</p>"
					gameEffect = "";
					type = "positive";
				break;
				case "Chanceux":
					description = "<p>Le dé roule ou la pièce tombe bien plus souvent en faveur du personnage que la normale, lui donnant l’occasion d’être bouche bée devant sa bonne fortune.</p>\n<p>Remarque : cela n’augmente pas la Chance du personnage mais lui donne seulement le droit de le faire ; le coût d’amélioration en Karma doit toujours être payé.</p>\n<p>Cet Avantage ne peut être pris qu’une fois et doit être approuvé par le meneur de jeu. Chanceux ne peut être combiné avec Attribut exceptionnel.</p>"
					gameEffect = "<p>Ce trait permet à un personnage de posséder un attribut Chance supérieur d’un point à son maximum racial (par exemple, 8 pour un humain).</p>";
					type = "positive";
       				customEffects= { "0": { "category": "characterSpecialAttributes", "target": "system.specialAttributes.edge.maximum", "type": "value", "value": 1, "multiplier": null }, "1": { "category": "reputationTypes", "target": "system.notoriety", "type": "value", "value": -1, "multiplier": 1, "wifi": false, "transfer": false } };
				break;
				case "Résistance à la magie I":
					description = "<p>Coût : 6 points de Karma par niveau (niveau max 4)</p>\n<p>Il s’agit de la merveilleuse capacité de pouvoir faire dévier une boule de feu.</p>\n<p>Le personnage reçoit 1 dé supplémentaire pour ses tests de résistance aux sorts par tranche de 6 points de Karma dépensés pour ce trait.</p>\n<p>Cet Avantage, toutefois, est toujours « actif » : le personnage ne peut diminuer sa résistance magique pour recevoir pleinement les effets bénéfiques de sorts tels que Soins.</p>\n<p>Un personnage doté de Résistance à la magie n’est jamais considéré comme un sujet volontaire pour les sorts qui en requièrent un : de tels sorts échouent automatiquement sur les personnages résistants à la magie.</p>\n<p>Un personnage doté d’un attribut Magie ne peut pas choisir ce trait.</p>"
					gameEffect = "<p>Confère 1 dé supplémentaire aux tests de résistance aux sorts par niveau.</p>";
					type = "positive";
					customEffects= { "0": { "category": "characterResistances", "target": "system.resistances.directSpellMana", "type": "rating", "multiplier": null }, "1": { "category": "characterResistances", "target": "system.resistances.directSpellPhysical", "type": "rating", "multiplier": null } };
					itemRating = 1;
				break;
				case "Mémoire photographique":
					description = "<p>Un personnage doté de Mémoire photographique peut se souvenir immédiatement des visages, des dates, des chiffres ou de tout ce qu’il a vu ou entendu.</p>"
					gameEffect = "<p>Confère un modificateur de réserve de dés de +2 à tous les tests de Mémoire.</p>";
					type = "positive";
					customEffects = { "0": { "category": "characterDerivedAttributes", "target": "system.derivedAttributes.memory", "type": "value", "value": 2, "multiplier": null } };
				break;
				case "Dur à cuire":
					description = "<p>Un personnage doté du trait Dur à cuire ignore les dommages plus facilement que les autres personnages.</p>"
					gameEffect = "<p>Le personnage gagne un modificateur de réserve de dés de +1 en Constitution lors de tests de résistance aux dommages.</p>";
					type = "positive";
					customEffects = { "0": { "category": "characterResistances", "target": "system.defenses.physicalDamage", "type": "value", "value": 1, "multiplier": null } };
				break;
				case "Rage de vivre I":
					description = "<p>Coût : 3 points de Karma par niveau (niveau max 3)</p>\n<p>Pour chaque niveau de Rage de vivre, le personnage gagne 1 case de surplus de dommages supplémentaire (p. 103). Ces cases supplémentaires ne permettent au personnage que d’encaisser des dommages supplémentaires avant de mourir ; elles n’augmentent pas le seuil à partir duquel le personnage perd connaissance. Elles n’affectent pas non plus les modificateurs de blessures subis par le personnage</p>"
					gameEffect = "<p>Confère 1 case de surplus de dommages supplémentaire par niveau.</p>";
					type = "positive";
					itemRating = 1;
					customEffects = { "0": { "category": "characterConditionMonitors", "wifi": false, "transfer": false, "target": "system.conditionMonitors.overflow", "type": "rating", "multiplier": 1 } };
				break;
				case "Malchanceux":
					description = "<p>Ce personnage a la poisse et sa propre chance se retourne souvent contre lui. À chaque fois que ce personnage utilise sa Chance, lancer 1D6. Sur un résultat de 1, la Chance est dépensée mais a l’effet exactement opposé à ce qui était souhaité.</p>\n<p>Par exemple, si un personnage espérait gagner des dés supplémentaires en dépensant de la Chance, le nombre de dés qu’il aurait dû gagner est au contraire retranché de sa réserve de dés. Si un personnage dépense de la Chance pour agir en premier dans sa Passe d’Initiative, il agit en fait en dernier. S’il dépense de la Chance pour un Blitz, il ne lance aucun dé et son score d’initiative est égal à son attribut Initiative. Si un personnage dépense de la Chance pour annuler une complication, celle-ci se transforme en échec critique.</p>\n<p>Le personnage ne subit de Malchance que sur un seul jet de Chance par séance de jeu. Après que le personnage ait subit sa Malchance, il n’a plus à tester sa Malchance sur de futures dépenses de Chance durant la même séance de jeu.</p>"
					gameEffect = "<p>Sans cet avantage, toute action accomplie uniquement avec la mauvaise main (comme tirer avec une arme) subit un modificateur de réserve de dés de -2 (voir Arme dans la mauvaise main, p. 179).</p>";
					type = "negative";
					customEffects = { "0": { "category": "reputationTypes", "target": "system.notoriety", "type": "value", "value": -1, "multiplier": 1, "wifi": false, "transfer": false } };
				break;
				case "Mauvaise réputation":
					description = "<p>Le personnage Ambidextre peut manipuler des objets avec l’une ou l’autre main indifféremment.</p>"
					gameEffect = "<p>Sans cet avantage, toute action accomplie uniquement avec la mauvaise main (comme tirer avec une arme) subit un modificateur de réserve de dés de -2 (voir Arme dans la mauvaise main, p. 179).</p>";
					type = "negative";
				break;
				case "Paralysie en combat":
					description = "<p>Un personnage atteint de Paralysie en combat est pétrifié en situation de combat.</p>"
					gameEffect = "<p>Score d'initiative divisé par 2 lors du premier tour de combat.</p>\n<p>-3 aux tests de surprise.</p>\n<p>modificateur de seuil de +1 à tous les tests de sang-froid en situation de combat ou sous le feu ennemi.</p>";
					type = "negative";
				break;
				case "Personnes à charge I":
					description = "<p>Un personnage ayant le trait Personnes à charge est responsable d’au moins une personne aimée, qui compte sur son aide financière ou son soutien moral. Les personnes à charge peuvent être des enfants, des parents, un conjoint, un frère, une soeur ou même un vieil ami.</p>\n<p>Répondre aux besoins de la personne à charge prend une partie non-négligeable du temps du personnage, ainsi qu’une partie de son argent.</p>\n<ul><li>Augmenter le temps nécessaire à l’apprentissage d’une nouvelle compétence ou d’augmentation d’une compétence existante de 50 %.</li>\n<li>Augmenter également le temps de base pour tout projet de 50 %.</li>\n<li>La personne à charge peut se révéler encombrante de bien d’autres manières : faire obstacle, occuper une partie de l’espace vital, s’immiscer dans les affaires du personnage, emprunter la voiture, appeler au plus mauvais moment, etc.</li></ul>\n<p><strong>Pour 3 points de Karma</strong>, la personne à charge est une nuisance occasionnelle, se rappelant au personnage de manière inattendue (comme par exemple quand le personnage doit se rendre à un rendez-vous), demandant un soutien moral, des services ou autres témoignages d’amitié / d’engagement et, occasionnellement, de l’argent. Exemples : un frère ou une soeur fainéant(e), une petite amie de longue date ou un enfant qui ne vit pas avec le personnage mais pour qui ce dernier paie une pension et a un droit de visite. </p>"
					gameEffect = "<p>Augmenter le coût de style de vie mensuel du personnage de 10%.</p>";
					type = "negative";
				break;
				case "Style distinctif":
					description = "<p>Un personnage qui prend ce défaut possède au moins un aspect de son apparence, de ses manière ou de sa personnalité qui le rend incommodément mémorable.</p>\n<p>Les choix de Style distinctif incluent (sans se limiter à) : des tatouages difficilement dissimulables, un accent ou une manière de parler atypique, des goûts bizarres en matière de mode, des cicatrices, des signes de gang ou de prison, des augmentations personnalisées tape à l’oeil ou des modifications non-métahumaines comme une queue. Remarque : ce qui est distinctif dans une culture ou un lieu peut ne pas l’être ailleurs.</p>\n<p>Quel que soit le Style distinctif choisi par le joueur, il rend son personnage mémorable. Quelqu’un qui tente d’identifier, de pister ou de localiser physiquement le personnage (ou obtenir des informations sur lui dans le cadre d’investigations) reçoit un modificateur de réserve de dés de +2 pour tous les tests effectuées durant le processus.</p>\n<p>Si un PNJ fait un test de Mémoire (p. 155) pour déterminer ce qu’il se rappelle du personnage, réduire son seuil de 1, pour un seuil minimum de 1.</p>\n<p>Ce Défaut est physique par nature et ne s’applique pas aux recherches astrales.</p>\n<p>Ce trait ne peut être pris qu’une fois. Ce Défaut incompatible avec M. Tout le monde.</p>"
					gameEffect = "";
					type = "negative";
				break;
				case "Poseur elfe":
					description = "<p>Le Poseur elfe est un personnage humain qui veut être un elfe. Il s’associe autant que possible avec des elfes, parle comme les elfes, et altère son apparence pour ressembler à un elfe.</p>\n<p>Le personnage avec ce Défaut peut recourir à la chirurgie esthétique pour avoir des oreilles et des yeux d’elfe, et peut réussir à se faire passer pour un elfe et éviter les modificateurs sociaux négatifs associés avec le fait de ne pas en être un.</p>\n<p>Les véritables elfes considèrent les Poseurs elfes comme une gêne, de nombreux humains les voient comme des traîtres, et les autres métatypes les considèrent comme pathétiques. Si un elfe découvre le secret du personnage, il est probable qu’il le traite avec mépris et hostilité (voir la table Modificateurs sociaux, p. 142). Un poseur elfe démasqué peut aussi faire face à une stigmatisation d’humains racistes comme « traîtres à sa race ».</p>\n<p>Seuls les personnages humains peuvent prendre ce Défaut.</p>"
					gameEffect = "";
					type = "negative";
				break;
				case "Gremlins I":
					description = "<p>Le personnage avec ce Défaut est fâché avec la technologie. Les appareils se dérèglent inexplicablement, les logiciels plantent inopinément, les véhicules refusent de démarrer, les composants deviennent inhabituellement fragiles à son contact et les liaisons wifi subissent des coupures de connexion et des interférences bizarres chaque fois qu’il est impliqué.</p><p>Pour chaque niveau (4 au maximum), réduisez le nombre de 1 nécessaires sur un jet pour obtenir une complication ou échec critique (p. 47) de 1 chaque fois que le personnage tente d’utiliser un appareil un tantinet sophistiqué. Par exemple, un personnage avec une réserve de dés de 8 et Gremlins au niveau 2 (8 points de Karma) déclencherait une complication ou un échec critique si le jet donnait ne seraitce que trois 1 (au lieu de 5 normalement). Le meneur de jeu peut aussi demander au joueur un test pour des opérations qui réussiraient normalement automatiquement, pour voir si une complication ou un échec critique se produit.</p>\n<p>Quand il décrit les effets d’une complication ou d’un échec critique déclenché par Gremlin, le meneur de jeu doit jouer la notion d’un dysfonctionnement mécanique ou électronique particulièrement étrange. Voici quelques exemples : le chargeur qui tombe d’un pistolet lors d’une tentative de tir critique, un clavier numérique qui grille inexplicablement pendant l’entrée d’un code pour désactiver un système d’alarme, ou l’interface de commlink qui passe en sperethiel au milieu d’une phrase pendant une tentative d’accès à un serveur sécurisé.</p>\n<p>Remarque : Gremlins est un Défaut. Ses effets gênent le personnage (et amusent probablement son entourage). Le personnage ne peut pas utiliser Gremlins pour endommager l’équipement high-tech d’un adversaire simplement en le touchant. Tout ce que le personnage tente de saboter en n’utilisant que Gremlins continuera à fonctionner sans faille (évidemment, il peut essayer tout moyen ordinaire de sabotage, mais Gremlins compliquera ses efforts). L’effet ne s’applique que sur de l’équipement externe et n’affecte pas le cyberware, le bioware ou autres implants.</p>"
					gameEffect = "<p>Le nombre de 1 nécessaires pour obtenir une complication ou un échec critique est réduit de 1 chaque fois que le personnage tente d’utiliser un appareil un tantinet sophistiqué.</p>";
					type = "negative";
				break;
				case "Insomnie I":
					description = "<p>Un personnage avec le trait Insomnie a des problèmes pour s’endormir et ne se sent reposé que rarement. Généralement, ce n’est qu’une gêne. Pour les runners, toutefois, cela peut devenir un gros problème lorsqu’il leur est essentiel de réussir à se reposer à la moindre occasion pour rester réactif et lucide.</p>\n<p>Ce Défaut peut allonger le temps nécessaire à un personnage pour récupérer de dommages étourdissants.</p>"
					gameEffect = "<p>Avant que le personnage ne fasse le jet de Constitution + Volonté pour récupérer de dommages étourdissants, il effectue un test d’Intuition + Volonté (4).</p>\n<p>S’il réussit ce test, il n’est pas gêné par l’Insomnie et récupère normalement de ses dommages étourdissants. Il récupère également 1 point de Chance après 8 heures de sommeil.</p>\n<p>Si le personnage échoue, doublez le temps nécessaire normalement pour récupérer ses dommages étourdissants. Donc au lieu de récupérer un nombre de cases en 1 heure, il lui faut maintenant 2 heures par jet.</p>\n<p>De plus, comme il est sujet à l’Insomnie, il ne peut pas récupérer sa Chance pendant 24 heures.</p>";
					type = "negative";
				break;
				case "Crise de confiance":
					description = "<p>Le Défaut Crise de confiance signifie que pour diverses raisons le personnage a perdu confiance en lui et une de ses capacités. Bien que decker compétent, il a échoué à hacker le serveur d’un Stuffer Shack ou, malgré une Agilité élevée, il a fait un échec critique sur un test d’Escalade et est tombé dans une benne à ordures. Quelle qu’en soit la raison, il doute maintenant de lui et de ses capacités.</p>\n<p>Dans les tests impliquant la compétence affectée, le personnage subit un modificateur de réserve de dés de -2. Si le personnage a une spécialisation dans cette compétence, il ne peut l’utiliser tant qu’il souffre de sa Crise de confiance.</p><p>La compétence choisie pour la Crise de confiance doit en être une dont le personnage est fier et dans laquelle il a investi. Seules les compétences d’indice 4 ou plus peuvent être la cible du Défaut Crise de confiance.</p>\n<p>La Chance ne peut pas être utilisée pour des tests impliquant cette compétence tant que le personnage souffre de cette Crise de confiance.</p>"
					gameEffect = "<p>Malus de -2 dans la compétence concernée.<br>Chance inutilisable pour ces tests.</p>";
					type = "negative";
				break;
				case "Poseur ork":
					description = "<p>Influencé par le Goblin Rock ou la mode de l’orxploitation, le Poseur ork est un personnage elfe ou humain qui altère son apparence pour ressembler à un ork. Diverses biomodifs esthétiques (implants de défenses, stéroïdes, altérations du larynx, etc.) lui permettent de passer pour un ork.</p>\n<p>Les poseurs orks sont une honte pour beaucoup d’orks, mais certains tolèrent, s’ils n’apprécient pas, le compliment implicite que représente cet effort. Cela signifie qu’un ork qui découvre le secret du personnage peut soit devenir très hostile à son égard, soit accepter de le laisser rejoindre « la famille » – à condition qu’il passe un rituel suffisamment humiliant pour prouver son « orkitude ». Un poseur ork démasqué peut également être stigmatisé par des autres humains ou elfes en tant que « traître à sa race », si ces humains / elfes ont des préjugés envers les orks.</p>\n<p>Seuls les humains et les elfes peuvent prendre le Défaut Poseur ork.</p>"
					gameEffect = "";
					type = "negative";
				break;
				case "Ecorché (BTLs)":
					description = "<p>Un personnage écorché fait face à des problèmes neurologiques engendrés par des dommages causés d'une quelconque manière par des CI noires, psychotropes ou des BTL.</p>\n<p>Le problème peut se manifester sous la forme d'une perte de mémoire à court ou long terme, de blackouts inopinés, de migraines fréquentes, de sens diminués (vue, toucher, odorat, etc.), et de troubles de l'humeur comme la paranoïa ou l'anxiété.</p><p>Le joueur choisit un effet particulier du Défaut, qui devrait être suffisamment prononcé pour gêner le personnage et présenter des accroches d'intrigues potentielles pour le meneur de jeu.</p>\n<p>La seule façon d'éliminer le trait écorché est de suivre le traitement médical nécessaire pour réparer les dommages, puis de dépenser le Karma pour racheter le Défaut.</p>\n<p>Une fois écorché, toutefois, le personnage est toujours susceptible de rechuter. Une autre mauvaise rencontre avec une CI noire ou psychotrope ou une BTL fera resurgir ce Défaut.</p>\n<p>Pour prendre le trait écorché pour les BTL, le personnage doit avoir au moins une Addiction Légère aux BTL et posséder le matériel nécessaire pour en utiliser.</p>\n<p>Pour prendre le trait écorché pour les CI noires ou psychotropes, le personnage doit être soit un decker, soit un technomancien.</p>"
					gameEffect = "<p>En RV ou lors d'utilisation de puce BTL, effectuer un test de Constitution + Volonté (4). Si échec, le personnage subit les effets physique du Défaut pendant 6 heures (24 en cas de complication).</p>\r\n<p>Face aux CI noires ou psychotropes, test de Sang-froid (4) pour être capable de l'affronter sans paniquer. Même si succès, malus de -2 aux tests de résistance aux dommages infligés par ce type de CI.</p>\n<p><strong>Paranoïa / anxiété :</strong>Le personnage doit effectuer des tests sociaux même pour les interactions les plus basiques. Il s'agit de tests de réussite avec un seuil de 5. Si aucune compétence évidente ne s'applique, le personnage doit se défausser sur son Charisme (avec le -1 dé habituel).</p><p>Un échec signifie que le personnage réagit avec paranoïa ou anxiété dans cette situation pour la durée de l'effet.</p>";
					type = "negative";
				break;
				case "Système sensible":
					description = "<p>Un personnage avec un Système sensible a des problèmes immunosuppressifs avec les implants cybernétiques. Doublez toutes les pertes d’Essence causées par le cyberware. Le bioware, quel que soit sa conception ou son type de culture, est rejeté par le corps du personnage.</p>\n<p>Ce trait a une conséquence sur les personnages technomanciens ou Éveillés. Ceux-ci restent pleinement capables de canaliser le mana ou d’utiliser la Résonance, mais ils sont potentiellement plus sensibles au Drain ou Technodrain.</p>"
					gameEffect = "<p>Pertes d’Essence causées par le cyberware doublées.<br>Impossible d'utiliser du Bioware.</p>\n<p>Un pratiquant de la magie ou un technomancien avec ce Défaut doit effectuer un test de Constitution + Volonté (4) avant tout test de Drain ou de Technodrain. Un échec à ce test a pour conséquence une augmentation de la Valeur de Drain ou de Technodrain de +2 pour ce test particulier, tandis que l’énergie qui traverse le corps du personnage inflige plus de dommages à son Système sensible.</p>";
					type = "negative";
				break;
				case "Asocial":
					description = "<p>Un personnage Asocial a des difficultés à interagir avec d’autres personnes. Il agit impulsivement, réagit excessivement à tout ce qu’il perçoit comme une provocation, et a tendance à faire tout ce qui lui passe par la tête sans se soucier des conséquences (comme faire un doigt d’honneur à M. Johnson, traiter un troll saoul de « trog », ou répondre aux insultes d’un runner rival en lui mettant son poing dans la figure).</p>\n<p>De plus, le coût d’apprentissage et d’amélioration des compétences sociales est doublé (y compris à la création), et un personnage Asocial ne peut par ailleurs jamais apprendre de groupe de compétences sociales. Un personnage Asocial est considéré comme « Ignorant » pour toutes les compétences sociales qu’il ne possède pas à l’indice 1 ou supérieur (voir l’encart Indices de compétences, p. 133). Le meneur de jeu peut exiger des tests de réussite dans des situations sociales dans lesquelles des personnages normaux n’auraient aucun problème.</p>"
					gameEffect = "<p>Les tests sociaux pour s’empêcher d’agir de manière incorrecte ou impulsive subissent un malus -2.</p>";
					type = "negative";
				break;
				case "Illettré":
					description = "<p>Un Illettré n’est pas un personnage mentalement retardé : il n’a simplement pas eu l’opportunité d’apprendre. Que ce soit parce que lui et sa famille étaient des squatters isolés, ou étaient des SINless, ou défavorisés d’une quelconque manière, l’accès au système éducatif lui a été refusé. Il n’a qu’une connaissance rudimentaire de la lecture, de l’écriture et de l’arithmétique.</p>\n<p>Le personnage avec le Défaut Illettré est considéré comme « Ignorant » dans les compétences techniques, les connaissances académiques et professionnelles qu’il ne possède pas (voir l’encart Indices de compétences, p. 133), et ne peut se défausser sur des tests de compétence pour ces compétences.</p>\n<p>Le meneur de jeu peut également demander pour ce personnage des tests de réussite pour des tâches ordinaires que le résident de conurb’ considère comme évidentes.</p>\n<p>De plus, le coût en Karma pour apprendre de nouvelles compétences, groupes de compétences ou spécialisations ou en améliorer dans ces catégories est calculé en utilisant le double de l’indice à atteindre (y compris à la création de personnage) et il est possible que le personnage n’apprenne jamais certains groupes de compétences appartenant à ces catégories.</p>"
					gameEffect = "<p>Ignorant dans les compétences techniques, les connaissances académiques et professionnelles.</p>";
					type = "negative";
					break;
					default:
				break;
			};

			q = {
			"_id": exportFoundry.makeID(16),
      		"name": quality,
      		"type": "itemQuality",
      		"img": "systems/sr5/img/items/itemQuality.svg",
      		"system": {
				"description": description,
				"gameEffect": gameEffect,
				"customEffects": customEffects,
				"itemEffects": itemEffects,
				"systemEffects": systemEffects,
				"isActive": true,
				"itemRating": itemRating,
				"type": type,
			},
		};

		return q;
	},

	get_foundry_power: function(power)
	{

		var gameEffect = "", description = "", systemEffects = [], customEffects = [], itemEffects = [], itemRating = 0, actionType = "permanent";

			switch(power.name) {
				case "Réflexes améliorés":
					description = "<p>Ce pouvoir augmente la vitesse de réaction de l’adepte, tout comme les réflexes câblés.</p><p>Le niveau maximal de Réflexes améliorés est 3, et cette augmentation ne peut être combinée avec d’autres augmentations technologiques ou magiques de l’initiative.</p>"
					gameEffect = "<p>Chaque niveau confère un modificateur de +1 à la Réaction qui affecte également l’Initiative, et +1D6 dés d’initiative (avec un maximum de 5D6).</p>";
					itemRating = power.rating;
					customEffects = { "0": { "category": "characterAttributes", "target": "system.attributes.reaction.augmented", "type": "rating", "multiplier": null }, "1": { "category": "characterInitiatives", "target": "system.initiatives.physicalInit.dice", "type": "rating", "multiplier": null } };
				break;
				case "Compétence améliorée":
					description = "<p>Ce pouvoir augmente l’indice d’une compétence spécifique de combat, de véhicules, physique, sociale ou technique de 1 point par niveau.</p>\n<p>Il est nécessaire de connaître cette compétence afin d’acheter ce pouvoir pour l’augmenter ,et il est impossible de l’acheter pour des groupes decompétences.</p>\n<p>L’amélioration maximale possible est égale àla moitié du niveau actuel de la compétence (soit un indice total égal au maximum à niveau actuel × 1,5), arrondie ausupérieur.</p>"
					gameEffect = "<p>Augmente la compétence choisie de 1 point par point de pouvoir.</p>";
					itemRating = power.rating;
					 switch(power.ability) {
						case "Pistolets":
						customEffects = { "0": { "category": "skills", "wifi": false, "transfer": false, "target": "system.skills.pistols.test", "type": "rating", "multiplier": null } };
						break;
						case "Fusils":
						customEffects = { "0": { "category": "skills", "wifi": false, "transfer": false, "target": "system.skills.longarms.test", "type": "rating", "multiplier": null } };
						break;
						case "Armes automatiques":
						customEffects = { "0": { "category": "skills", "wifi": false, "transfer": false, "target": "system.skills.automatics.test", "type": "rating", "multiplier": null } };
						break;
						case "Armes tranchantes":
						customEffects = { "0": { "category": "skills", "wifi": false, "transfer": false, "target": "system.skills.blades.test", "type": "rating", "multiplier": null } };
						break;
						case "Armes contondantes":
						customEffects = { "0": { "category": "skills", "wifi": false, "transfer": false, "target": "system.skills.clubs.test", "type": "rating", "multiplier": null } };
						break;
					 }
				break;
				case "Attribut amélioré":
					description = "<p>Ce pouvoir permet de dépasser le maximum naturel d’attribut, jusqu’à son maximum augmenté (maximum naturel + 4)</p>"
					gameEffect = "<p>Ce pouvoir augmente l’indice d’un attribut physique précis (Agilité, Constitution, Force, Réaction) de 1 point par niveau, et peut également affecter la Limite physique en fonction du nouvel indice, entre autres (l’indice amélioré de l’attribut est pris en compte pour tout ce qu’affecte normalement l’attribut).</p>";
					itemRating = power.rating;
					 switch(power.attribute) {
						case "Agility":
						customEffects = { "0": { "category": "characterAttributes", "target": "system.attributes.agility.augmented", "type": "rating", "multiplier": 1 }, "1": { "category": "characterAttributes", "target": "system.attributes.agility.maximum", "type": "rating", "multiplier": 1 } };
						break;
						case "Strength":
						customEffects = { "0": { "category": "characterAttributes", "target": "system.attributes.strength.augmented", "type": "rating", "multiplier": 1 }, "1": { "category": "characterAttributes", "target": "system.attributes.strength.maximum", "type": "rating", "multiplier": 1 } };
						break;
						case "Reaction":
						customEffects = { "0": { "category": "characterAttributes", "target": "system.attributes.reaction.augmented", "type": "rating", "multiplier": 1 }, "1": { "category": "characterAttributes", "target": "system.attributes.reaction.maximum", "type": "rating", "multiplier": 1 } };
						break;
						case "Body":
						customEffects = { "0": { "category": "characterAttributes", "target": "system.attributes.body.augmented", "type": "rating", "multiplier": 1 }, "1": { "category": "characterAttributes", "target": "system.attributes.body.maximum", "type": "rating", "multiplier": 1 } };
						break;
					 }
				break;
			};

			ap = {
			"_id": exportFoundry.makeID(16),
      		"name": power.name,
      		"type": "itemAdeptPower",
      		"img": "systems/sr5/img/items/itemAdeptPower.svg",
      		"system": {
				"description": description,
				"gameEffect": gameEffect,
				"customEffects": customEffects,
				"itemEffects": itemEffects,
				"systemEffects": systemEffects,
				"isActive": true,
				"itemRating": itemRating,
				"actionType": actionType,
			},
		};

		return ap;
	},


	get_foundry_augmentation: function(augmentation)
	{

		var gameEffect = "", description = "", systemEffects = [], customEffects = [], itemEffects = [], itemRating = 0, essenceCost = 0, type, category = "", accessory = [], id = exportFoundry.makeID(16), isAccessory = false, name = augmentation.name, isPlugged = false;

			switch(augmentation.name) {
				case "Augmentation de densité osseuse":
					description = "<p>La structure moléculaire des os est altérée pour en accroître la densité et la force élastique, et les ligaments sont renforcés. Cela alourdit légèrement le personnage.</p><p>L’augmentation de densité musculaire n’est pas compatible avec les autres augmentations qui changent ou altèrent les os, telle que l’ossature renforcée.</p><p>De par sa nature, il est impossible de retirer une augmentation de densité osseuse et donc d’en obtenir d’occasion.</p>";
					gameEffect = "<p>L’attribut Constitution est augmenté de l’indice de l’augmentation de densité musculaire pour résister aux dommages (à l’exception de ceux causés par les drogues, toxines et maladies) et les dommages à mains nues sont également augmentés (voir la table d’augmentation de densité musculaire).</p";
					itemRating = augmentation.rating;
					essenceCost = 0.3;
					type = "bioware";
					customEffects = { "0": { "category": "characterResistances", "target": "system.defenses.physicalDamage", "type": "rating", "value": null, "multiplier": null } };
				break;
				case "Ossature renforcée":
					description = "<p>Les os sont renforcés d’un maillage de plastique durci ou de métal, renforçant leur intégrité, leur solidité et leur force élastique mais augmentant le poids du corps.</p><p>Trois types d’ossature renforcée existent : plastique, aluminium et titane, un seul type pouvant être installé à la fois.</p><p>L’ossature renforcée n’est pas compatible avec les autres augmentations qui changent ou altèrent les os, telle que l’augmentation de densité osseuse.</p>";
					gameEffect = "<p>Augmente la Constitution pour résister aux dommages (à l’exception de ceux causés par les drogues, toxines et maladies) de 2 et fournit 2 points d’Armure (cumulative avec les autres sources d’armure et sans causer d’encombrement).</p><p>Changent les dommages à mains nues à FOR + 2P.</p>";
					itemRating = augmentation.rating;
					essenceCost = 0.5;
					type = "cyberware";
					category = "bodyware";
					customEffects = { "0": { "category": "characterResistances", "target": "system.resistances.physicalDamage", "type": "rating", "value": 2, "multiplier": null }, "1": { "category": "itemArmor", "target": "system.itemsProperties.armor", "type": "rating", "value": 2, "multiplier": null } };
				
				break;
				case "Cervelet amplifié":
					description = "<p>Voilà le Saint Graal de la neuro-amplification. Bien que l’amplificateur cérébral existe depuis vingt ans, l’amélioration de l’instinct naturel de l’utilisateur échappait aux possibilités des chercheurs. C’est grâce à une percée d’Aztechnology que la réponse a pu être trouvée ; au lieu de se concentrer sur le cerveau postérieur, il fallait s’occuper du cervelet. Avec un travail prudent sur le cervelet latéral, le mouvement et l’absorption des données sensorielles peuvent être améliorés, ce qui entraîne une réponse plus naturelle aux stimuli externes et améliore littéralement le passage de la pensée à l’action. Tout ça pour dire que l’utilisateur est plus instinctif et est capable de répondre à des stimuli sans que ses satanées fonctions supérieures soient impliquées.</p>";
					gameEffect = "<p>Le cervelet amplifié augmente l’Intuition de l’utilisateur de son indice.</p>";
					itemRating = augmentation.rating;
					essenceCost = 0.2;
					type = "culturedBioware";
					customEffects = { "0": { "category": "characterAttributes", "wifi": false, "transfer": false, "target": "system.attributes.intuition.augmented", "type": "rating" } };
				
				break;
				case "Amplificateur cérébral":
					description = "<p>Les circonvolutions du cerveau sont améliorées et des tissus nerveux supplémentaires sont ajoutés pour améliorer les performances du cerveau.</p>";
					gameEffect = "<p>L’amplificateur cérébral ajoute son indice à l’attribut Logique.</p>";
					itemRating = augmentation.rating;
					essenceCost = 0.2;
					type = "culturedBioware";
					customEffects = { "0": { "category": "characterAttributes", "target": "system.attributes.logic.augmented", "type": "rating", "multiplier": null } };

				break;
				case "Cyberbras (gauche":
				case "Cyberbras (droit)":
					description = "";
					gameEffect = "";
					itemRating = 1;
					essenceCost = 1;
					type = "cyberware";
					category = "cyberlimbs";
					customEffects = { "0": { "category": "characterConditionMonitors", "target": "system.conditionMonitors.physical", "type": "value", "value": 1, "multiplier": null }, "1": { "category": "characterConditionMonitors", "target": "system.conditionMonitors.condition", "type": "value", "value": 1, "multiplier": null } };

				break;
				case "Yeux cybernétiques":
					description = "";
					gameEffect = "";
					itemRating = augmentation.rating;
					essenceCost = 0;
					type = "cyberware";
					category = "eyeware";
					customEffects = {"0": { "category": "visionTypes", "target": "system.visions.lowLight.natural", "type": "boolean", "value": "false" }, "1": { "category": "visionTypes", "target": "system.visions.thermographic.natural", "type": "boolean", "value": "false" }, "2": { "category": "visionTypes", "wifi": false, "target": "system.visions.ultrasound.natural", "type": "boolean", "value": "false" }, "3": { "category": "specialProperties", "target": "system.specialProperties.smartlink", "type": "value", "value": 2, "multiplier": 1 }};

					/*
					var item_1ID = exportFoundry.makeID(16);
					var item_1 = {
						"_id": item_1ID,
						"name": "Compensation anti-flash",
						"type": "itemAugmentation",
						"img": "systems/sr5/img/items/itemAugmentation.svg",
						"system": {
						  "description": "<p>Protège de l’éblouissementet des flashes aveuglants.</p>",
						  "gameEffect": "<p>Les modificateurs de vision d’éblouissement et de flashes (tels que les flash-pak) sont réduits (voir table p. 176)</p>",
						  "isActive": true,
						  "customEffects": {
							"0": {
							  "category": "environmentalModifiers",
							  "wifi": false,
							  "target": "system.itemsProperties.environmentalMod.glare",
							  "type": "value",
							  "value": -2,
							  "multiplier": 1
							}
						  },
						  "isActive": true,
						  "itemRating": 0,
						  "isWireless": true,
						  "wirelessTurnedOn": true,
						  "deviceRating": 2,
						  "capacityTaken": {
							"value": 1,
							"base": 1,
							"modifiers": [],
							"multiplier": ""
						  },
						  "isAccessory": true,
						  "type": "cyberware",
						  "category": "eyeware",
						  "grade": "standard",
						  "isPlugged": true,
						}
					};
					var item_2ID = exportFoundry.makeID(16);
					var item_2 = {
						"_id": item_2ID,
						"name": "Interface visuelle",
						"type": "itemAugmentation",
						"img": "systems/sr5/img/items/itemAugmentation.svg",
						"system": {
						  "description": "<p>Amélioration courante, cette interfacepermet d’afficher des informations visuelles (textes,images, vidéos, heure, etc.) dans le champ de vision. Il s’agitle plus souvent d’ORA, mais il est en fait possible d’afficherà peu près n’importe quoi.</p><p>Il est par exemple possible à uneéquipe de partager des informations tactiques et de situationen temps réel.</p><p>Une interface visuelle est ce qu’il faut pourréellement  voirla RA et participer au monde moderne.</p>",
						  "isActive": true,
						  "itemRating": 0,
						  "isWireless": true,
						  "wirelessTurnedOn": true,
						  "capacityTaken": {
							"value": 0,
							"base": 0,
							"modifiers": [],
							"multiplier": ""
						  },
						  "isAccessory": true,
						  "type": "cyberware",
						  "category": "eyeware",
						  "grade": "standard",
						  "isPlugged": true,
						}
					};
					var item_3ID = exportFoundry.makeID(16);
					var item_3 = {
						"_id": item_3ID,
						"name": "Smartlink",
						"type": "itemAugmentation",
						"img": "systems/sr5/img/items/itemAugmentation.svg",
						"system": {
						  "description": "<p>Cet accessoire doit être couplé à un smartgun pour tirer pleinement parti du système.</p><p>Le smartlinkinforme l’utilisateur de la distance des différentes cibles,ainsi que du niveau du chargeur (et du type de munitions),de l’échauffement du canon, du stress mécanique, etc. Sanssmartlink, le smartgun émet des données que personne nereçoit, et donc inutiles. Un système smartlink est plus efficaces’il est installé dans un oeil naturel ou cybernétique quedans un équipement externe, voir Smartgun, p. 435.</p>",
						  "customEffects": {
							"0": {
							  "category": "specialProperties",
							  "target": "system.specialProperties.smartlink",
							  "type": "value",
							  "value": 2,
							  "multiplier": 1
							}
						  },
						  "isActive": true,
						  "itemRating": 0,
						  "isWireless": true,
						  "wirelessTurnedOn": true,
						  "deviceRating": 2,
						  "capacityTaken": {
							"value": 3,
							"base": 3,
							"modifiers": [],
							"multiplier": ""
						  },
						  "isAccessory": true,
						  "type": "cyberware",
						  "category": "eyeware",
						  "grade": "standard",
						  "isPlugged": true,						  
						}
					};
					var item_4ID = exportFoundry.makeID(16);
					var item_4 = {
						"_id": item_4ID,
						"name": "Vision nocturne",
						"type": "itemAugmentation",
						"img": "systems/sr5/img/items/itemAugmentation.svg",
						"system": {
						  "description": "<p>Cette amélioration permet de voir normalement sous des lumières aussi faibles qu’une nuit étoilée.</p><p>Elle n’est cependant d’aucun secours dans le noir complet.</p>",
						  "customEffects": {
							"0": {
							  "category": "visionTypes",
							  "target": "system.visions.lowLight.augmented",
							  "type": "boolean",
							  "value": "true"
							}
						  },
						  "isActive": true,
						  "itemRating": 0,
						  "isWireless": true,
						  "wirelessTurnedOn": true,
						  "deviceRating": 2,
						  "capacityTaken": {
							"value": 2,
							"base": 2,
							"modifiers": [],
							"multiplier": ""
						  },
						  "isAccessory": true,
						  "type": "cyberware",
						  "category": "eyeware",
						  "grade": "standard",
						  "isPlugged": true,
						}
					};
					var item_5ID = exportFoundry.makeID(16);
					var item_5 = {
						"_id": item_5ID,
						"name": "Vision thermographique",
						"type": "itemAugmentation",
						"img": "systems/sr5/img/items/itemAugmentation.svg",
						"system": {
						  "description": "<p>Cette amélioration permetde voir dans le spectre infrarouge, révélant ainsi la température.</p><p>C’est particulièrement pratique pour repérer lescréatures vivantes dans l’obscurité totale, pour comprendresi un moteur ou une machine a été utilisé récemment, etainsi de suite.</p>",
						  "customEffects": {
							"0": {
							  "category": "visionTypes",
							  "target": "system.visions.thermographic.augmented",
							  "type": "boolean",
							  "value": "true"
							}
						  },
						  "isActive": true,
						  "itemRating": 0,
						  "isWireless": true,
						  "wirelessTurnedOn": true,
						  "deviceRating": 2,
						  "capacityTaken": {
							"value": 2,
							"base": 2,
							"modifiers": [],
							"multiplier": ""
						  },
						  "isAccessory": true,
						  "type": "cyberware",
						  "category": "eyeware",
						  "grade": "standard",
						  "isPlugged": false,
						}
					};
					accessory = [item_1, item_2, item_3, item_4, item_5];
					*/
				break;
				case "Cyberjambe (gauche)":
				case "Cyberjambe (droite)":
					description = ""
					gameEffect = "";
					itemRating = 1;
					essenceCost = 1;
					type = "cyberware";
					category = "cyberlimbs";
					customEffects = { "0": { "category": "characterConditionMonitors", "target": "system.conditionMonitors.physical", "type": "value", "value": 1, "multiplier": null }, "1": { "category": "characterConditionMonitors", "target": "system.conditionMonitors.condition", "type": "value", "value": 1, "multiplier": null } };

				break;
				case "Datajack":
					description = "<p>Un datajack fournit une interface neurale directe (p. 222), ce qui est pratique dans de nombreux cas, et contient environ un mètre de micro-câble rétractable qui permet de s’interfacer directement avec n’importe quel appareil via son connecteur universel.</p><p>Un datajack dispose d’une mémoire de stockage propre permettant de télécharger et stocker des fichiers. Deux personnes équipées de datajack peuvent se relier par un câble de fibre optique afin d’avoir une conversation mentale privée ne pouvant être espionnée ni par interception radio, ni par une oreille indiscrète.</p>";
					gameEffect = "<p><em>Sans fil :</em>le datajack fournit un point de réduction de Bruit.</p>";
					itemRating = augmentation.rating;
					essenceCost = 0;
					type = "cyberware";
					category = "headware";
					customEffects = { "0": { "category": "matrixAttributes", "target": "system.matrix.attributes.noiseReduction", "type": "value", "value": 1, "multiplier": null } };

				break;
				case "Armure dermique":
					description = "<p>Des plaques de plastique et fibres decéramiques sont greffées sur la peau. Les plaques sont clairementvisibles, et encore plus évidentes au toucher, maiselles peuvent être enjolivées par des couleurs et texturesstylisées. </p>";
					gameEffect = "<p>L’armure dermique fournit un bonus d’armure égalà son indice (cumulatif avec les autres sources d’armure et sans causer d’encombrement). Elle ne peut pas être combinée avec d’autres augmentations de la peau qui fournissent de l’armure, orthoderme compris.</p>";
					itemRating = augmentation.rating;
					essenceCost = 0.5;
					type = "cyberware";
					category = "bodyware";
					customEffects = { "0": { "category": "itemArmor", "target": "system.itemsProperties.armor", "type": "rating", "multiplier": 1 } };
				
				break;
				case "Réservoir d\'air interne":
					description = "<p>Le réservoir d’air interne remplace une partie d’un poumon par un réservoir d’air sous pression qui permet de retenir son souffle pendant (indice) heures.</p><p>Il rend possible les opérations sous-marines prolongées et immunise contre les toxines de vecteur inhalation tant que l’utilisateur retient sa respiration.</p>";
					gameEffect = "<p>Activer ou désactiver le réservoir est une action simple. Il se recharge par une valve située sous la cage thoracique, ce qui prend cinq minutes, mais peut aussi se recharger en 6 heures de respiration normale.</p><p>Sans fil :activer ou désactiver le réservoir devient une action gratuite et l’utilisateur est informé en permanence du volume exact d’air ainsi que de sa pureté.</p>";
					itemRating = 1;
					essenceCost = 0.25;
					type = "cyberware";
					category = "bodyware";

				break;
				case "Renforcement musculaire":
					description = "<p>Ce traitement spécial de tissage biologique renforce les tissus musculaires existants, plutôt que de les remplacer par des muscles cultivés en cuve.</p><p>Des câbles musculaires spécialement développés in-vitro sont tressés avec les fibres musculaires, ce qui augmente la masse musculaire, la force brute et la corpulence de la personne.</p><p>De par sa nature, il est impossible de retirer un renforcement musculaire et donc d’en obtenir d’occasion.</p>";
					gameEffect = "<p>Le renforcement musculaire ajoute son indice à la Force du personnage. Cet implant n’est pas compatible avec les autres augmentations qui augmentent la Force, remplacement musculaire compris.</p>";
					itemRating = augmentation.rating;
					essenceCost = 0.2;
					type = "bioware";
					customEffects = { "0": { "category": "characterAttributes", "target": "system.attributes.strength.augmented", "type": "rating", "multiplier": null } };

				break;
				case "Tonification musculaire":
					description = "<p>Ce traitement augmente l’élasticité et la tension des fibres musculaires, ce qui affine la silhouette.</p>";
					gameEffect = "<p>La tonification musculaire ajoute son indice à l’Agilitédu personnage. Cet implant n’est pas compatible avec lesautres augmentations qui augmentent l’Agilité, remplacement musculaire compris.</p>";
					itemRating = augmentation.rating;
					essenceCost = 0.2;
					type = "bioware";
					customEffects = { "0": { "category": "characterAttributes", "target": "system.attributes.agility.augmented", "type": "rating", "multiplier": null } };

				break;
				case "Orthoderme":
					description = "<p>Ce maillage de fibres biologiques intégrées à la peau fournit l’équivalent d’une armure personnelle tout en étant quasiment indiscernable.</p>";
					gameEffect = "<p>L’orthoderme fournit un bonus d’armure égal à son indice (cumulatif avec les autres sources d’armure et sans causer d’encombrement). Il ne peut pas être combiné avec d’autres augmentations de la peau qui fournissent de l’armure, armure dermique comprise.</p>";
					itemRating = augmentation.rating;
					essenceCost = 0.25;
					type = "bioware";
					customEffects = { "0": { "category": "itemArmor", "target": "system.itemsProperties.armor", "type": "rating", "multiplier": 1 } };

				break;
				case "Griffes (retractable) implantées":
					description = "<p>Armes biologiques des plus communes, les griffes, sont parfaitement fidèles à leur nom : des longues griffes acérées qui prolongent les doigts ou les orteils. Généralement acquises par paire, elles permettent à l’utilisateur de toujours être armé, mais elles doivent être déclarées comme armes létales. Les griffes sont disponibles en version rétractable ou non. Les utilisateurs devraient faire attention à adapter leurs tenues, ou à simplement sortir sans gants ou chaussures selon où se trouvent les griffes.</p>";
					gameEffect = "<table style=\\\"width: 104.981%; height: 114px;\\\" border=\\\"1\\\">\\n<tbody>\\n<tr style=\\\"height: 38px;\\\">\\n<td style=\\\"width: 25.985%; text-align: center; height: 38px;\\\">Arme biologique de m&ecirc;l&eacute;e</td>\\n<td style=\\\"width: 26.717%; text-align: center; height: 38px;\\\">PRECISION</td>\\n<td style=\\\"width: 23.4231%; text-align: center; height: 38px;\\\">ALLONGE</td>\\n<td style=\\\"width: 7.68571%; text-align: center; height: 38px;\\\">VD</td>\\n<td style=\\\"width: 16.1034%; text-align: center; height: 38px;\\\">PA</td>\\n</tr>\\n<tr style=\\\"height: 76px;\\\">\\n<td style=\\\"width: 25.985%; text-align: center; height: 76px;\\\">Griffes</td>\\n<td style=\\\"width: 26.717%; text-align: center; height: 76px;\\\">(Limite physique)</td>\\n<td style=\\\"width: 23.4231%; text-align: center; height: 76px;\\\">-</td>\\n<td style=\\\"width: 7.68571%; text-align: center; height: 76px;\\\">(FOR+1)P</td>\\n<td style=\\\"width: 16.1034%; text-align: center; height: 76px;\\\">-3</td>\\n</tr>\\n</tbody>\\n</table>";
					itemRating = 1;
					essenceCost = 0;
					type = "culturedBioware";
					category = "cyberweapon";

				break;
				case "Amplificateur synaptique":
					description = "<p>Les cellules nerveuses de la moelle épinière sont élargies et dupliquées, ce qui augmente la bande passante nerveuse. Il en résulte un temps de réaction bien plus court.</p>";
					gameEffect = "<p>L’amplificateur fournit un bonus d’un point de Réaction (ainsi que les ajustements liés d’Initiative et Limite physique) et un dé d’initiative par point d’indice. L’amplificateur synaptique n’est compatible avec aucune autre amélioration de Réaction ou d’Initiative.</p>";
					itemRating = augmentation.rating;
					essenceCost = 0.5;
					type = "culturedBioware";
					customEffects = { "0": { "category": "characterAttributes", "target": "system.attributes.reaction.augmented", "type": "rating", "multiplier": null }, "1": { "category": "characterInitiatives", "target": "system.initiatives.physicalInit.dice", "type": "rating", "multiplier": null } };

				break;
				case "Réflexes câblés":
					description = "<p>Une multitude d’accélérateurs neuraux et de stimulateurs d’adrénaline sont implantés lors d’une opération hautement invasive et douloureuse pour projeter l’utilisateur dans un monde entièrement nouveau où tout semble bouger au ralenti.</p><p>Les réflexes câblés ne sont compatibles avec aucune augmentation qui affecte la Réaction ou l’Initiative.</p>";
					gameEffect = "<p>Les réflexes câblés peuvent être activés ou coupés par un interrupteur manuel en une action complexe ou sans fil en une action simple. Une fois activés, ils augmentent la Réaction (et donc l’Initiative) et le nombre de dés d’initiative de leur indice.</p><p><em>Sans fil :</em>les réflexes câblés deviennent compatibles avec un accroissement de réaction dont la fonctionnalité sans fil est activée. Leur bonus combiné peut dépasser le maximum de +4.</p>";
					itemRating = augmentation.rating;
					essenceCost = 2;
					type = "cyberware";
					category = "bodyware";
					customEffects = { "0": { "category": "characterAttributes", "target": "system.attributes.reaction.augmented", "type": "rating", "multiplier": null }, "1": { "category": "characterInitiatives", "target": "system.initiatives.physicalInit.dice", "type": "rating", "multiplier": null } };

				break;
				default:
				break;
			};

			
			/*
			switch (augmentation) {				
				case "Compensation anti-flashs":
					name = augmentation;
					id = item_1ID;
					description = "<p>Protège de l’éblouissementet des flashes aveuglants.</p>"
					gameEffect = "<p>Les modificateurs de vision d’éblouissement et de flashes (tels que les flash-pak) sont réduits (voir table p. 176)</p>";
					isAccessory = true;
					itemRating = 0;
					essenceCost = 0;
					type = "cyberware";
					category = "eyeware";
					customEffects = { "0": { "category": "environmentalModifiers", "wifi": false, "target": "system.itemsProperties.environmentalMod.glare", "type": "value", "value": -2, "multiplier": 1 } };

				break;
				case "Interface visuelle":
					name = augmentation;
					id = item_2ID;
					description = "<p>Amélioration courante, cette interfacepermet d’afficher des informations visuelles (textes,images, vidéos, heure, etc.) dans le champ de vision. Il s’agitle plus souvent d’ORA, mais il est en fait possible d’afficherà peu près n’importe quoi.</p><p>Il est par exemple possible à uneéquipe de partager des informations tactiques et de situationen temps réel.</p><p>Une interface visuelle est ce qu’il faut pourréellement  voirla RA et participer au monde moderne.</p>";
					gameEffect = "";
					isAccessory = true;
					itemRating = 0;
					essenceCost = 0;
					type = "cyberware";
					category = "eyeware";

				break;
				case "Smartlink":
					name = augmentation;
					id = item_3ID;
					description = "<p>Cet accessoire doit être couplé à un smartgun pour tirer pleinement parti du système.</p><p>Le smartlinkinforme l’utilisateur de la distance des différentes cibles,ainsi que du niveau du chargeur (et du type de munitions),de l’échauffement du canon, du stress mécanique, etc. Sanssmartlink, le smartgun émet des données que personne nereçoit, et donc inutiles. Un système smartlink est plus efficaces’il est installé dans un oeil naturel ou cybernétique quedans un équipement externe, voir Smartgun, p. 435.</p>";
					gameEffect = "";
					isAccessory = true;
					itemRating = 0;
					essenceCost = 0;
					type = "cyberware";
					category = "eyeware";
					customEffects = { "0": { "category": "specialProperties", "target": "system.specialProperties.smartlink", "type": "value", "value": 2, "multiplier": 1 } };

				break;
				case "Vision nocturne":
					name = augmentation;
					id = item_4ID;
					description = "<p>Cette amélioration permet de voir normalement sous des lumières aussi faibles qu’une nuit étoilée.</p><p>Elle n’est cependant d’aucun secours dans le noir complet.</p>";
					gameEffect = "<p>Les modificateurs de vision d’éblouissement et de flashes (tels que les flash-pak) sont réduits (voir table p. 176)</p>";
					isAccessory = true;
					itemRating = 0;
					essenceCost = 0;
					type = "cyberware";
					category = "eyeware";
					customEffects = { "0": { "category": "visionTypes", "target": "system.visions.lowLight.augmented", "type": "boolean", "value": "true" } };

				break;
				case "Vision thermographique":
					name = augmentation;
					id = item_5ID;
					description = "<p>Cette amélioration permetde voir dans le spectre infrarouge, révélant ainsi la température.</p><p>C’est particulièrement pratique pour repérer lescréatures vivantes dans l’obscurité totale, pour comprendresi un moteur ou une machine a été utilisé récemment, etainsi de suite.</p>";
					gameEffect = "";
					isAccessory = true;
					itemRating = 0;
					essenceCost = 0;
					type = "cyberware";
					category = "eyeware";
					customEffects = { "0": { "category": "visionTypes", "target": "system.visions.thermographic.augmented", "type": "boolean", "value": "true" } };

				break;
				default:
				break;
			}
			*/

			aug = {
			"_id": id,
      		"name": name,
      		"type": "itemAugmentation",
      		"img": "systems/sr5/img/items/itemAugmentation.svg",
      		"systel": {
				"description": description,
				"gameEffect": gameEffect,
				"customEffects": customEffects,
				"itemEffects": itemEffects,
				"systemEffects": systemEffects,
				"isActive": true,
				"isWireless": true,
				"wirelessTurnedOn": true,
				"itemRating": itemRating,
				"isAccessory": isAccessory,
				"type": type,
				"category": category,
				"grade": "standard",
				"isPlugged": isPlugged,
				"essenceCost": {
				  "value": 0,
				  "base": essenceCost,
				  "modifiers": [],
				  "multiplier": "rating"
				},
				"accessory": accessory,
			},
		};
			return aug;
	},

};