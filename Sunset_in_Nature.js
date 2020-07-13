
var VSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  'precision mediump int;\n' +
  '#endif\n' + 

	'struct MatlT {\n' +	
	'		vec3 emit;\n' +	
	'		vec3 ambi;\n' +
	'		vec3 diff;\n' +
	'		vec3 spec;\n' +
	'		int shiny;\n' +
  '		};\n' +    

  //'uniform float u_L0on;\n' +
  //'uniform float u_L1on;\n' +
  //'uniform float u_L2on;\n' +

  //VERTEX ATTRIBUTES
  'attribute vec4 a_Position; \n' +	
  'attribute vec4 a_Normal; \n' +	
  'attribute vec3 a_Color;\n' +	

	'uniform MatlT u_MatlSet[1];\n' +

  'uniform mat4 u_MvpMatrix; \n' +
  'uniform mat4 uLoc_ModelMatrix; \n' +
  'uniform mat4 u_NormalMatrix; \n' + 

  'uniform float u_Blinn; \n' +
  'uniform float u_Gouraud; \n' +
  'uniform float u_Ground; \n' +
  'uniform float u_ATT_opt; \n' +
  																			
	'uniform vec3 u_Kd; \n' +						

  'varying vec4 v_Position; \n' +				
  'varying vec3 v_Normal; \n' +					
  'varying vec4 v_Color; \n' +
  'varying vec3 pass_C;\n' +


  'struct LampT {\n' +    
  '   vec3 pos;\n' +
  '   vec3 ambi;\n' +
  '   vec3 diff;\n' +
  '   vec3 spec;\n' +   
  '   };\n' + 

  'uniform LampT u_LampSet[4];\n' +

  'uniform vec3 u_Ke;\n' +            // Phong Reflectance: emissive
  'uniform vec3 u_Ka;\n' +
  'uniform vec3 u_Ks;\n' +            // Phong Reflectance: specular
  'uniform int u_Kshiny;\n' + 
//
  'uniform vec3 u_eyePosWorld; \n' +  // Camera/eye location in world coords.
  //'uniform vec3 dist2Light; \n' +

	//-----------------------------------------------------------------------------
  'void main() { \n' +
  '  if (u_Ground == 0.0) {\n' +
  '  gl_Position = u_MvpMatrix * uLoc_ModelMatrix * a_Position;\n' +
  '  v_Position = uLoc_ModelMatrix * a_Position; \n' +
  '}\n' +
  '  if (u_Ground == 1.0) {\n' +
  '  gl_Position = u_MvpMatrix * uLoc_ModelMatrix * vec4(a_Position.x, sin(a_Position.x) + sin(a_Position.z), a_Position.z, 1.0);\n' +
  '  v_Position = uLoc_ModelMatrix * vec4(a_Position.x, sin(a_Position.x) + sin(a_Position.z), a_Position.z, 1.0); \n' +
  '}\n' +
  '  v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));\n' +
	//'	 v_Kd = u_MatlSet[0].diff; \n' +
	'  pass_C = a_Color;\n' +


  ' vec3 emissive = u_Ke;\n' +

  ' if (u_ATT_opt == 0.0) {\n' +

  ' if (u_Gouraud == 1.0) {\n' + //IF GOURAUD TOGGLED ON

   '  vec3 normal = normalize(v_Normal); \n' +
   '  vec3 eyeDirection = normalize(u_eyePosWorld - v_Position.xyz); \n' +

   // '  if (u_L0on == 1.0) {\n' +
  '  float dist2Light1 = distance(u_LampSet[0].pos, v_Position.xyz);\n' +
  '  vec3 lightDirection1 = normalize(u_LampSet[0].pos - v_Position.xyz);\n' +
  '  float nDotL1 = max(dot(lightDirection1, normal), 0.0); \n' +
  '  vec3 H1 = normalize(lightDirection1 + eyeDirection); \n' +
  '  float nDotH1 = max(dot(H1, normal), 0.0); \n' +
  '  float e641 = pow(nDotH1, float(u_Kshiny));\n' +
  //'  }\n' +

  //'  if (u_L1on == 1.0) {\n' +
  '  float dist2Light2 = distance(u_LampSet[1].pos, v_Position.xyz);\n' +
  '  vec3 lightDirection2 = normalize(u_LampSet[1].pos - v_Position.xyz);\n' +
  '  float nDotL2 = max(dot(lightDirection2, normal), 0.0); \n' +
  '  vec3 H2 = normalize(lightDirection2 + eyeDirection); \n' +
  '  float nDotH2 = max(dot(H2, normal), 0.0); \n' +
  '  float e642 = pow(nDotH2, float(u_Kshiny));\n' +
  //'  }\n' +

  //'  if (u_L2on == 1.0) {\n' +
  '  float dist2Light3 = distance(u_LampSet[2].pos, v_Position.xyz);\n' +
  '  vec3 lightDirection3 = normalize(u_LampSet[2].pos - v_Position.xyz);\n' +
  '  float nDotL3 = max(dot(lightDirection3, normal), 0.0); \n' +  
  '  vec3 H3 = normalize(lightDirection3 + eyeDirection); \n' +
  '  float nDotH3 = max(dot(H3, normal), 0.0); \n' +
  '  float e643 = pow(nDotH3, float(u_Kshiny));\n' +
  //'  }\n' +

  //'  if (u_L3on == 1.0) {\n' +
  '  float dist2Light4 = distance(u_LampSet[3].pos, v_Position.xyz);\n' +
  '  vec3 lightDirection4 = normalize(u_LampSet[3].pos - v_Position.xyz);\n' +
  '  float nDotL4 = max(dot(lightDirection4, normal), 0.0); \n' +  
  '  vec3 H4 = normalize(lightDirection4 + eyeDirection); \n' +
  '  float nDotH4 = max(dot(H4, normal), 0.0); \n' +
  '  float e644 = pow(nDotH4, float(u_Kshiny));\n' +
  //'  }\n' +

  '  if (u_Blinn == 1.0) {\n' +
  '  vec3 ambient = u_LampSet[0].ambi * u_Ka + u_LampSet[1].ambi * u_Ka + u_LampSet[2].ambi * u_Ka + u_LampSet[3].ambi * u_Ka;\n' +
  '  vec3 diffuse = u_LampSet[0].diff * u_Kd * nDotL1 + u_LampSet[1].diff * u_Kd * nDotL2 + u_LampSet[2].diff * u_Kd * nDotL3 + u_LampSet[3].diff * u_Kd * nDotL4;\n' +
  '  vec3 speculr = u_LampSet[0].spec * u_Ks * e641 + u_LampSet[1].spec * u_Ks * e642 + u_LampSet[2].spec * u_Ks * e643 + u_LampSet[3].spec * u_Ks * e644;\n' +
  '  v_Color = vec4(emissive + ambient + diffuse + speculr + a_Color*0.12, 1.0);\n' +
  '  }\n' +

  '  if (u_Blinn == 0.0) {\n' +
  '  vec3 ambient = u_LampSet[0].ambi * u_Ka + u_LampSet[1].ambi * u_Ka + u_LampSet[2].ambi * u_Ka + u_LampSet[3].ambi * u_Ka;\n' +
  '  vec3 diffuse = u_LampSet[0].diff * u_Kd * nDotL1 + u_LampSet[1].diff * u_Kd * nDotL2 + u_LampSet[2].diff * u_Kd * nDotL3 + u_LampSet[3].diff * u_Kd * nDotL4;\n' +

  '  vec3 reflectionvector1 = reflect(-lightDirection1, normal);\n' +
  '  vec3 reflectionvector2 = reflect(-lightDirection2, normal);\n' +
  '  vec3 reflectionvector3 = reflect(-lightDirection3, normal);\n' +
  '  vec3 reflectionvector4 = reflect(-lightDirection4, normal);\n' +

  '  float specTmp1 = max(dot(reflectionvector1, eyeDirection), 0.0);\n' +
  '  float specTmp2 = max(dot(reflectionvector2, eyeDirection), 0.0);\n' +
  '  float specTmp3 = max(dot(reflectionvector3, eyeDirection), 0.0);\n' +
  '  float specTmp4 = max(dot(reflectionvector4, eyeDirection), 0.0);\n' +

  '  float specularIntensity1 = pow(specTmp1, float(u_Kshiny));\n' +
  '  float specularIntensity2 = pow(specTmp2, float(u_Kshiny));\n' +
  '  float specularIntensity3 = pow(specTmp3, float(u_Kshiny));\n' +
  '  float specularIntensity4 = pow(specTmp4, float(u_Kshiny));\n' +

  '  vec3 speculr = u_LampSet[0].spec * u_Ks * specularIntensity1 + u_LampSet[1].spec * u_Ks * specularIntensity2 + u_LampSet[2].spec * u_Ks * specularIntensity3 + u_LampSet[3].spec * u_Ks * specularIntensity4;\n' +
  '  v_Color = vec4(emissive + ambient + diffuse + speculr + a_Color*0.12 , 1.0);\n' +
  '  }\n' +
  '  }\n' +



  '  if (u_ATT_opt != 0.0) {\n' +


  ' if (u_Gouraud == 1.0) {\n' + //IF GOURAUD TOGGLED ON

   '  vec3 normal = normalize(v_Normal); \n' +
   '  vec3 eyeDirection = normalize(u_eyePosWorld - v_Position.xyz); \n' +

   // '  if (u_L0on == 1.0) {\n' +
  '  float dist2Light1 = distance(u_LampSet[0].pos, v_Position.xyz);\n' +
  '  vec3 lightDirection1 = normalize(u_LampSet[0].pos - v_Position.xyz);\n' +
  '  float nDotL1 = max(dot(lightDirection1, normal), 0.0); \n' +
  '  vec3 H1 = normalize(lightDirection1 + eyeDirection); \n' +
  '  float nDotH1 = max(dot(H1, normal), 0.0); \n' +
  '  float e641 = pow(nDotH1, float(u_Kshiny));\n' +
  //'  }\n' +

  //'  if (u_L1on == 1.0) {\n' +
  '  float dist2Light2 = distance(u_LampSet[1].pos, v_Position.xyz);\n' +
  '  vec3 lightDirection2 = normalize(u_LampSet[1].pos - v_Position.xyz);\n' +
  '  float nDotL2 = max(dot(lightDirection2, normal), 0.0); \n' +
  '  vec3 H2 = normalize(lightDirection2 + eyeDirection); \n' +
  '  float nDotH2 = max(dot(H2, normal), 0.0); \n' +
  '  float e642 = pow(nDotH2, float(u_Kshiny));\n' +
  //'  }\n' +

  //'  if (u_L2on == 1.0) {\n' +
  '  float dist2Light3 = distance(u_LampSet[2].pos, v_Position.xyz);\n' +
  '  vec3 lightDirection3 = normalize(u_LampSet[2].pos - v_Position.xyz);\n' +
  '  float nDotL3 = max(dot(lightDirection3, normal), 0.0); \n' +  
  '  vec3 H3 = normalize(lightDirection3 + eyeDirection); \n' +
  '  float nDotH3 = max(dot(H3, normal), 0.0); \n' +
  '  float e643 = pow(nDotH3, float(u_Kshiny));\n' +
  //'  }\n' +

  //'  if (u_L3on == 1.0) {\n' +
  '  float dist2Light4 = distance(u_LampSet[3].pos, v_Position.xyz);\n' +
  '  vec3 lightDirection4 = normalize(u_LampSet[3].pos - v_Position.xyz);\n' +
  '  float nDotL4 = max(dot(lightDirection4, normal), 0.0); \n' +  
  '  vec3 H4 = normalize(lightDirection4 + eyeDirection); \n' +
  '  float nDotH4 = max(dot(H4, normal), 0.0); \n' +
  '  float e644 = pow(nDotH4, float(u_Kshiny));\n' +
  //'  }\n' +

  //SET DIFFERENT ATT VALUES BASED ON SELECTION

  '  float ATT1 = 1.0;\n' +
  '  float ATT2 = 1.0;\n' +
  '  float ATT3 = 1.0;\n' +
  '  float ATT4 = 1.0;\n' +

  '  if (u_ATT_opt == 2.0) {\n' +
  '  float ATT1 = 1.0/dist2Light1; \n' +
  '  float ATT2 = 1.0/dist2Light2; \n' +
  '  float ATT3 = 1.0/dist2Light3; \n' +
  '  float ATT4 = 1.0/dist2Light4; \n' +
  '  }\n' +

  '  if (u_ATT_opt == 3.0) {\n' +
  '  float ATT1 = 1.0/(dist2Light1 * dist2Light1); \n' +
  '  float ATT2 = 1.0/(dist2Light2 * dist2Light2); \n' +
  '  float ATT3 = 1.0/(dist2Light3 * dist2Light3); \n' +
  '  float ATT4 = 1.0/(dist2Light4 * dist2Light4); \n' +
  '  }\n' +

  '  if (u_Blinn == 1.0) {\n' +
  '  vec3 ambient = u_LampSet[0].ambi * u_Ka + u_LampSet[1].ambi * u_Ka + u_LampSet[2].ambi * u_Ka + u_LampSet[3].ambi * u_Ka;\n' +
  '  vec3 diffuse = u_LampSet[0].diff * ATT1 * u_Kd * nDotL1 + u_LampSet[1].diff * ATT2 * u_Kd * nDotL2 + u_LampSet[2].diff * ATT3 *  u_Kd * nDotL3 + u_LampSet[3].diff * ATT4 * u_Kd * nDotL4;\n' +
  '  vec3 speculr = u_LampSet[0].spec * ATT1 * u_Ks * e641 + u_LampSet[1].spec * ATT2 * u_Ks * e642 + u_LampSet[2].spec * ATT3 * u_Ks * e643 + u_LampSet[3].spec * ATT4 * u_Ks * e644;\n' +
  '  v_Color = vec4(emissive + ambient + diffuse + speculr + a_Color*0.12, 1.0);\n' +
  '  }\n' +

  '  if (u_Blinn == 0.0) {\n' +
  '  vec3 ambient = u_LampSet[0].ambi * u_Ka + u_LampSet[1].ambi * u_Ka + u_LampSet[2].ambi * u_Ka + u_LampSet[3].ambi * u_Ka;\n' +
  '  vec3 diffuse = u_LampSet[0].diff * ATT1 * u_Kd * nDotL1 + u_LampSet[1].diff * ATT2 * u_Kd * nDotL2 + u_LampSet[2].diff * ATT3 * u_Kd * nDotL3 + u_LampSet[3].diff * ATT4 * u_Kd * nDotL4;\n' +

  '  vec3 reflectionvector1 = reflect(-lightDirection1, normal);\n' +
  '  vec3 reflectionvector2 = reflect(-lightDirection2, normal);\n' +
  '  vec3 reflectionvector3 = reflect(-lightDirection3, normal);\n' +
  '  vec3 reflectionvector4 = reflect(-lightDirection4, normal);\n' +

  '  float specTmp1 = max(dot(reflectionvector1, eyeDirection), 0.0);\n' +
  '  float specTmp2 = max(dot(reflectionvector2, eyeDirection), 0.0);\n' +
  '  float specTmp3 = max(dot(reflectionvector3, eyeDirection), 0.0);\n' +
  '  float specTmp4 = max(dot(reflectionvector4, eyeDirection), 0.0);\n' +

  '  float specularIntensity1 = pow(specTmp1, float(u_Kshiny));\n' +
  '  float specularIntensity2 = pow(specTmp2, float(u_Kshiny));\n' +
  '  float specularIntensity3 = pow(specTmp3, float(u_Kshiny));\n' +
  '  float specularIntensity4 = pow(specTmp4, float(u_Kshiny));\n' +

  '  vec3 speculr = u_LampSet[0].spec * ATT1 * u_Ks * specularIntensity1 + u_LampSet[1].spec * ATT2 * u_Ks * specularIntensity2 + u_LampSet[2].spec * ATT3 * u_Ks * specularIntensity3 + u_LampSet[3].spec * ATT4 * u_Ks * specularIntensity4;\n' +
  '  v_Color = vec4(emissive + ambient + diffuse + speculr + a_Color*0.12 , 1.0);\n' +


  '  }\n' +
  '  }\n' +




  '}\n' +

  '}\n' +


  '}\n';

//=============================================================================
// Fragment shader program
//=============================================================================
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  'precision mediump int;\n' +
  '#endif\n' + 


	'struct LampT {\n' +		
	'		vec3 pos;\n' +
	' 	vec3 ambi;\n' +
	' 	vec3 diff;\n' +
	'		vec3 spec;\n' +		
  '   };\n' +   	
	
	'struct MatlT {\n' +
	'		vec3 emit;\n' +		
	'		vec3 ambi;\n' +		
	'		vec3 diff;\n' +		
	'		vec3 spec;\n' + 		
	'		int shiny;\n' +		
  '		};\n' +

  'uniform float u_Gouraud;\n' + 
  'uniform float u_Blinn;\n' +
  'uniform float u_ATT_opt; \n' +
  
	'uniform LampT u_LampSet[4];\n' +	
	'uniform MatlT u_MatlSet[1];\n' +	

  'uniform vec3 u_Kd; \n' + 
  'uniform vec3 u_Ke;\n' +
  'uniform vec3 u_Ka;\n' +
  'uniform vec3 u_Ks;\n' +  
  'uniform int u_Kshiny;\n' +

  //'uniform float u_L0on;\n' +
  //'uniform float u_L1on;\n' +
  //'uniform float u_L2on;\n' +

  //'uniform int matlIndex'

  'uniform vec3 u_eyePosWorld; \n' + 
  
  'varying vec3 v_Normal;\n' +
  'varying vec4 v_Position;\n' +
  //'varying vec3 v_Kd;	\n' +						
  'varying vec4 v_Color;\n' + 
  'varying vec3 pass_C;\n' +

  //'uniform vec3 dist2Light; \n' +

  'void main() { \n' +
	'  vec3 normal = normalize(v_Normal); \n' +

  '  vec3 eyeDirection = normalize(u_eyePosWorld - v_Position.xyz); \n' +

 // '  if (u_L0on == 1.0) {\n' +
  '  float dist2Light1 = distance(u_LampSet[0].pos, v_Position.xyz);\n' +
	'  vec3 lightDirection1 = normalize(u_LampSet[0].pos - v_Position.xyz);\n' +
  '  float nDotL1 = max(dot(lightDirection1, normal), 0.0); \n' +
  '  vec3 H1 = normalize(lightDirection1 + eyeDirection); \n' +
  '  float nDotH1 = max(dot(H1, normal), 0.0); \n' +
  '  float e641 = pow(nDotH1, float(u_Kshiny));\n' +
  //'  }\n' +

  //'  if (u_L1on == 1.0) {\n' +
  '  float dist2Light2 = distance(u_LampSet[1].pos, v_Position.xyz);\n' +
  '  vec3 lightDirection2 = normalize(u_LampSet[1].pos - v_Position.xyz);\n' +
  '  float nDotL2 = max(dot(lightDirection2, normal), 0.0); \n' +
  '  vec3 H2 = normalize(lightDirection2 + eyeDirection); \n' +
  '  float nDotH2 = max(dot(H2, normal), 0.0); \n' +
  '  float e642 = pow(nDotH2, float(u_Kshiny));\n' +
  //'  }\n' +

  //'  if (u_L2on == 1.0) {\n' +
  '  float dist2Light3 = distance(u_LampSet[2].pos, v_Position.xyz);\n' +
  '  vec3 lightDirection3 = normalize(u_LampSet[2].pos - v_Position.xyz);\n' +
  '  float nDotL3 = max(dot(lightDirection3, normal), 0.0); \n' +  
  '  vec3 H3 = normalize(lightDirection3 + eyeDirection); \n' +
  '  float nDotH3 = max(dot(H3, normal), 0.0); \n' +
  '  float e643 = pow(nDotH3, float(u_Kshiny));\n' +
  //'  }\n' +

    //'  if (u_L3on == 1.0) {\n' +
  '  float dist2Light4 = distance(u_LampSet[3].pos, v_Position.xyz);\n' +
  '  vec3 lightDirection4 = normalize(u_LampSet[3].pos - v_Position.xyz);\n' +
  '  float nDotL4 = max(dot(lightDirection4, normal), 0.0); \n' +  
  '  vec3 H4 = normalize(lightDirection4 + eyeDirection); \n' +
  '  float nDotH4 = max(dot(H4, normal), 0.0); \n' +
  '  float e644 = pow(nDotH4, float(u_Kshiny));\n' +
  //'  }\n' +

  '	 vec3 emissive = 										u_Ke;\n' +

  '  if (u_ATT_opt == 0.0) {\n' +

  '  if (u_Blinn == 1.0) {\n' +

  '  vec3 ambient = u_LampSet[0].ambi * u_Ka + u_LampSet[1].ambi * u_Ka + u_LampSet[2].ambi * u_Ka + u_LampSet[3].ambi * u_Ka;\n' +
  '  vec3 diffuse = u_LampSet[0].diff * u_Kd * nDotL1 + u_LampSet[1].diff * u_Kd * nDotL2 + u_LampSet[2].diff * u_Kd * nDotL3 + u_LampSet[3].diff * u_Kd * nDotL4;\n' +
  '  vec3 speculr = u_LampSet[0].spec * u_Ks * e641 + u_LampSet[1].spec * u_Ks * e642 + u_LampSet[2].spec * u_Ks * e643 + u_LampSet[3].spec * u_Ks * e644;\n' + 
  
  '  if (u_Gouraud == 0.0) {\n' +
  '  gl_FragColor = vec4((emissive + ambient + diffuse + speculr + 0.12*pass_C) , 1.0);\n' +
  '  }\n' +

  '  if (u_Gouraud == 1.0) {\n' +
  '  gl_FragColor = v_Color;\n' +
  '  }\n' +

  '  }\n' +

  '  if (u_Blinn == 0.0) {\n' +
  '  vec3 ambient = u_LampSet[0].ambi * u_Ka + u_LampSet[1].ambi * u_Ka + u_LampSet[2].ambi * u_Ka + u_LampSet[3].ambi * u_Ka;\n' +
  '  vec3 diffuse = u_LampSet[0].diff * u_Kd * nDotL1 + u_LampSet[1].diff * u_Kd * nDotL2 + u_LampSet[2].diff * u_Kd * nDotL3 + u_LampSet[3].diff * u_Kd * nDotL4;\n' +

  '  vec3 reflectionvector1 = reflect(-lightDirection1, normal);\n' +
  '  vec3 reflectionvector2 = reflect(-lightDirection2, normal);\n' +
  '  vec3 reflectionvector3 = reflect(-lightDirection3, normal);\n' +
  '  vec3 reflectionvector4 = reflect(-lightDirection4, normal);\n' +

  '  float specTmp1 = max(dot(reflectionvector1, eyeDirection), 0.0);\n' +
  '  float specTmp2 = max(dot(reflectionvector2, eyeDirection), 0.0);\n' +
  '  float specTmp3 = max(dot(reflectionvector3, eyeDirection), 0.0);\n' +
  '  float specTmp4 = max(dot(reflectionvector4, eyeDirection), 0.0);\n' +

  '  float specularIntensity1 = pow(specTmp1, float(u_Kshiny));\n' +
  '  float specularIntensity2 = pow(specTmp2, float(u_Kshiny));\n' +
  '  float specularIntensity3 = pow(specTmp3, float(u_Kshiny));\n' +
  '  float specularIntensity4 = pow(specTmp4, float(u_Kshiny));\n' +

  '  vec3 speculr = u_LampSet[0].spec * u_Ks * specularIntensity1 + u_LampSet[1].spec * u_Ks * specularIntensity2 + u_LampSet[2].spec * u_Ks * specularIntensity3 + u_LampSet[3].spec * u_Ks * specularIntensity4;\n' +

  '  if (u_Gouraud == 0.0) {\n' +
  '  gl_FragColor = vec4(emissive + ambient + diffuse + speculr + 0.12*pass_C, 1.0);\n' +
  '  }\n' +

  '  if (u_Gouraud == 1.0) {\n' +
  '  gl_FragColor = v_Color;\n' +
  '  }\n' +

  '  }\n' +
  '  }\n' +
  

  '  if (u_ATT_opt != 0.0) {\n' +

    //SET DIFFERENT ATT VALUES BASED ON SELECTION

  '  float ATT1 = 1.0;\n' +
  '  float ATT2 = 1.0;\n' +
  '  float ATT3 = 1.0;\n' +
  '  float ATT4 = 1.0;\n' +

  '  if (u_ATT_opt == 2.0) {\n' +
  '  float ATT1 = 1.0/dist2Light1; \n' +
  '  float ATT2 = 1.0/dist2Light2; \n' +
  '  float ATT3 = 1.0/dist2Light3; \n' +
  '  float ATT4 = 1.0/dist2Light4; \n' +
  '  }\n' +

  '  if (u_ATT_opt == 3.0) {\n' +
  '  float ATT1 = 1.0/(dist2Light1 * dist2Light1); \n' +
  '  float ATT2 = 1.0/(dist2Light2 * dist2Light2); \n' +
  '  float ATT3 = 1.0/(dist2Light3 * dist2Light3); \n' +
  '  float ATT4 = 1.0/(dist2Light4 * dist2Light4); \n' +
  '  }\n' +

  '  if (u_Blinn == 1.0) {\n' +

  '  vec3 ambient = u_LampSet[0].ambi * u_Ka + u_LampSet[1].ambi * u_Ka + u_LampSet[2].ambi * u_Ka + u_LampSet[3].ambi * u_Ka;\n' +
  '  vec3 diffuse = u_LampSet[0].diff * ATT1 * u_Kd * nDotL1 + u_LampSet[1].diff * ATT2 * u_Kd * nDotL2 + u_LampSet[2].diff * ATT3 * u_Kd * nDotL3 + u_LampSet[3].diff * ATT4 * u_Kd * nDotL4;\n' +
  '  vec3 speculr = u_LampSet[0].spec * ATT1 * u_Ks * e641 + u_LampSet[1].spec * ATT2 * u_Ks * e642 + u_LampSet[2].spec * ATT3 * u_Ks * e643 + u_LampSet[3].spec * ATT4 * u_Ks * e644;\n' + 
  
  '  if (u_Gouraud == 0.0) {\n' +
  '  gl_FragColor = vec4((emissive + ambient + diffuse + speculr + 0.12*pass_C) , 1.0);\n' +
  '  }\n' +

  '  if (u_Gouraud == 1.0) {\n' +
  '  gl_FragColor = v_Color;\n' +
  '  }\n' +

  '  }\n' +

  '  if (u_Blinn == 0.0) {\n' +
  '  vec3 ambient = u_LampSet[0].ambi * u_Ka + u_LampSet[1].ambi * u_Ka + u_LampSet[2].ambi * u_Ka + u_LampSet[3].ambi * u_Ka;\n' +
  '  vec3 diffuse = u_LampSet[0].diff * ATT1 * u_Kd * nDotL1 + u_LampSet[1].diff * ATT2 * u_Kd * nDotL2 + u_LampSet[2].diff * ATT3 * u_Kd * nDotL3 + u_LampSet[3].diff * ATT4 * u_Kd * nDotL4;\n' +

  '  vec3 reflectionvector1 = reflect(-lightDirection1, normal);\n' +
  '  vec3 reflectionvector2 = reflect(-lightDirection2, normal);\n' +
  '  vec3 reflectionvector3 = reflect(-lightDirection3, normal);\n' +
  '  vec3 reflectionvector4 = reflect(-lightDirection4, normal);\n' +

  '  float specTmp1 = max(dot(reflectionvector1, eyeDirection), 0.0);\n' +
  '  float specTmp2 = max(dot(reflectionvector2, eyeDirection), 0.0);\n' +
  '  float specTmp3 = max(dot(reflectionvector3, eyeDirection), 0.0);\n' +
  '  float specTmp4 = max(dot(reflectionvector4, eyeDirection), 0.0);\n' +

  '  float specularIntensity1 = pow(specTmp1, float(u_Kshiny));\n' +
  '  float specularIntensity2 = pow(specTmp2, float(u_Kshiny));\n' +
  '  float specularIntensity3 = pow(specTmp3, float(u_Kshiny));\n' +
  '  float specularIntensity4 = pow(specTmp4, float(u_Kshiny));\n' +

  '  vec3 speculr = u_LampSet[0].spec * ATT1 * u_Ks * specularIntensity1 + u_LampSet[1].spec * ATT2 * u_Ks * specularIntensity2 + u_LampSet[2].spec * ATT3 * u_Ks * specularIntensity3 + u_LampSet[3].spec * ATT4 * u_Ks * specularIntensity4;\n' +

  '  if (u_Gouraud == 0.0) {\n' +
  '  gl_FragColor = vec4(emissive + ambient + diffuse + speculr + 0.12*pass_C, 1.0);\n' +
  '  }\n' +

  '  if (u_Gouraud == 1.0) {\n' +
  '  gl_FragColor = v_Color;\n' +
  '  }\n' +

  '  }\n' +
  '  }\n' +
  '  }\n';



/*'  vec3 ambient = u_LampSet[0].ambi * u_Ka + u_LampSet[1].ambi * u_Ka + u_LampSet[2].ambi * u_Ka;\n' +
  '  vec3 diffuse = u_LampSet[0].diff * u_Kd * nDotL1 + u_LampSet[1].diff * u_Kd * nDotL2 + u_LampSet[2].diff * u_Kd * nDotL3;\n' +
  '	 vec3 speculr = u_LampSet[0].spec * u_Ks * e641 + u_LampSet[1].spec * u_Ks * e642 + u_LampSet[2].spec * u_Ks * e643;\n' + 

  '  gl_FragColor = vec4((speculr+diffuse+ambient)*0.9+(0.1 * v_Color), 1.0);\n' + */


  //'  gl_FragColor = vec4(speculr+diffuse+ambient, 1.0);\n' +
  //'  gl_FragColor = vec4(normalize(vec3(emissive + ambient + diffuse + speculr) * v_Color) * 0.5, 1.0);\n' +

//=============================================================================
// Global vars for mouse click-and-drag for rotation.
var isDrag=false;	
var xMclik=0.0;	
var yMclik=0.0;   
var xMdragTot=0.0;
var yMdragTot=0.0;  

//		-- For 3D scene:
var uLoc_eyePosWorld 	= false;
var uLoc_ModelMatrix 	= false;
var uLoc_MvpMatrix 		= false;
var uLoc_NormalMatrix = false;

// ... for Phong material/reflectance:
var uLoc_Ke = false;
var uLoc_Ka = false;
var uLoc_Kd = false;
var uLoc_Ks = false;
var uLoc_Kshiny = false;

//var u_Blinn = false;
//var u_Gouraud = false;

//  ... for 3D scene variables (previously used as arguments to draw() function)
var canvas 	= false;
var gl 			= false;
var n_vcount= false;	// formerly 'n', but that name is far too vague and terse
											// to use safely as a global variable.

var x_movement = true;
var y_movement = false;

var iterator = 0.0; 
var ANGLE_STEP = 8.0;

var floatsPerVertex = 6;

//controls view translation
var increment = 0.3;

//controls view horizontal pivot
var degree = 90.0;
var deg_inc = 1.0;
var pan = false;

var pi = 3.1415926535;

var dragSnake = false;
var dragFlow = false;
var stemMove = true;
var petalBloom = true;

var numFish = 4;

//LIGHT FOUR POSITION AND ATTRIBUTE VARIABLES
var l3xpos = 0.0;
var l3ypos = 0.0;

var ambR = 0.5;
var ambG = 0.5;
var ambB = 0.5;

var difR = 0.8;
var difG = 0.8;
var difB = 0.8;

var specR = 1.0;
var specG = 1.0;
var specB = 1.0;

var ADStoggle = 0;

function Lamp(pos, ambi, diff, spec) {
  this.pos = pos;
  this.ambi = ambi;
  this.diff = diff;
  this.spec = spec;
}  

// NEXT, create global vars that contain the values we send thru those uniforms,
//  ... for our camera:
var	eyePosWorld = new Float32Array(3);	// x,y,z in world coords
//  ... for our transforms:
var modelMatrix = new Matrix4();  // Model matrix
var	mvpMatrix 	= new Matrix4();	// Model-view-projection matrix
var	normalMatrix= new Matrix4();	// Transformation matrix for normals

var forward_vector = new Vector3();
var horizontal_vector = new Vector3();

//LIGHTS//
var lamp0 = new LightsT();
var lamp1 = new LightsT();
var lamp2 = new LightsT();
var lamp3 = new LightsT();

//MATERIALS//
var matlSel= MATL_BRASS;
var matl0 = new Material(matlSel + 5);
var matl1 = new Material(matlSel + 8); 
var matl2 = new Material(matlSel + 13);

var matl0_Ke = new Float32Array(3);
var matl0_Ka = new Float32Array(3);
var matl0_Kd = new Float32Array(3);
var matl0_Ks = new Float32Array(3);
var matl0_Kshiny = false;

var matl1_Ke = new Float32Array(3);
var matl1_Ka = new Float32Array(3);
var matl1_Kd = new Float32Array(3);
var matl1_Ks = new Float32Array(3);
var matl1_Kshiny = false; 

var matl2_Ke = new Float32Array(3);
var matl2_Ka = new Float32Array(3);
var matl2_Kd = new Float32Array(3);
var matl2_Ks = new Float32Array(3);
var matl2_Kshiny = false; 

var on = 1.0;
var off = 0.0;

var u_Blinn = 0.0;
var u_Gouraud = 0.0;

var u_Ground = 0.0;
var u_ATT_opt = 0.0;

var att_option = 0.0;
//var matl3 = new Material(matlSel);     

// ---------------END of global vars----------------------------

viewInstructions();
//=============================================================================
function main() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context \'gl\' for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  console.log(VSHADER_SOURCE);
  console.log(FSHADER_SOURCE);

  // 
  n_vcount = initVertexBuffers(gl);		// vertex count.
  if (n_vcount < 0) {
    console.log('Failed to set the vertex information: n_vcount false');
    return;
  }

  // Set the clear color and enable the depth test
  gl.clearColor(0.2, 0.2, 0.2, 1.0);
  gl.enable(gl.DEPTH_TEST);

	document.onkeydown= function(ev){myKeyPress(ev); };
  canvas.onmousedown	=	function(ev){myMouseDown( ev, gl, canvas) }; 
  
  					// when user's mouse button goes down call mouseDown() function
  canvas.onmousemove = 	function(ev){myMouseMove( ev, gl, canvas) };
  
											// call mouseMove() function					
  canvas.onmouseup = 		function(ev){myMouseUp(   ev, gl, canvas)};


	window.addEventListener("keyup", myKeyUp, false);

  uLoc_eyePosWorld  = gl.getUniformLocation(gl.program, 'u_eyePosWorld');
  uLoc_ModelMatrix  = gl.getUniformLocation(gl.program, 'uLoc_ModelMatrix');
  uLoc_MvpMatrix    = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
  uLoc_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
  if (!uLoc_eyePosWorld ||
      !uLoc_ModelMatrix	|| !uLoc_MvpMatrix || !uLoc_NormalMatrix) {
  	console.log('Failed to get GPUs matrix storage locations');
  	return;
  	}
	//  ... for Phong light source:
	// NEW!  Note we're getting the location of a GLSL struct array member:

  lamp0.u_pos  = gl.getUniformLocation(gl.program, 'u_LampSet[0].pos');	
  lamp0.u_ambi = gl.getUniformLocation(gl.program, 'u_LampSet[0].ambi');
  lamp0.u_diff = gl.getUniformLocation(gl.program, 'u_LampSet[0].diff');
  lamp0.u_spec = gl.getUniformLocation(gl.program, 'u_LampSet[0].spec');
  if( !lamp0.u_pos || !lamp0.u_ambi	|| !lamp0.u_diff || !lamp0.u_spec	) {
    console.log('Failed to get GPUs Lamp0 storage locations');
    return;
  }

  lamp1.u_pos  = gl.getUniformLocation(gl.program, 'u_LampSet[1].pos'); 
  lamp1.u_ambi = gl.getUniformLocation(gl.program, 'u_LampSet[1].ambi');
  lamp1.u_diff = gl.getUniformLocation(gl.program, 'u_LampSet[1].diff');
  lamp1.u_spec = gl.getUniformLocation(gl.program, 'u_LampSet[1].spec');
  if( !lamp1.u_pos || !lamp1.u_ambi || !lamp1.u_diff || !lamp1.u_spec ) {
    console.log('Failed to get GPUs Lamp1 storage locations');
    return;
  }

  lamp2.u_pos  = gl.getUniformLocation(gl.program, 'u_LampSet[2].pos'); 
  lamp2.u_ambi = gl.getUniformLocation(gl.program, 'u_LampSet[2].ambi');
  lamp2.u_diff = gl.getUniformLocation(gl.program, 'u_LampSet[2].diff');
  lamp2.u_spec = gl.getUniformLocation(gl.program, 'u_LampSet[2].spec');
  if( !lamp2.u_pos || !lamp2.u_ambi || !lamp2.u_diff || !lamp2.u_spec ) {
    console.log('Failed to get GPUs Lamp2 storage locations');
    return;
  }

  lamp3.u_pos  = gl.getUniformLocation(gl.program, 'u_LampSet[3].pos'); 
  lamp3.u_ambi = gl.getUniformLocation(gl.program, 'u_LampSet[3].ambi');
  lamp3.u_diff = gl.getUniformLocation(gl.program, 'u_LampSet[3].diff');
  lamp3.u_spec = gl.getUniformLocation(gl.program, 'u_LampSet[3].spec');
  if( !lamp3.u_pos || !lamp3.u_ambi || !lamp3.u_diff || !lamp3.u_spec ) {
    console.log('Failed to get GPUs Lamp3 storage locations');
    return;
  }

	uLoc_Ke = gl.getUniformLocation(gl.program, 'u_Ke');
	uLoc_Ka = gl.getUniformLocation(gl.program, 'u_Ka');
	uLoc_Kd = gl.getUniformLocation(gl.program, 'u_Kd');
	uLoc_Ks = gl.getUniformLocation(gl.program, 'u_Ks');
	uLoc_Kshiny = gl.getUniformLocation(gl.program, 'u_Kshiny');

    if(!uLoc_Ke || !uLoc_Ka || !uLoc_Kd
              || !uLoc_Ks || !uLoc_Kshiny
     ) {
    console.log('Failed to get GPUs Reflectance storage locations');
    return;
  }

  //MOVE THESE TO DRAW FUNCTION!!!!

  if(blinn == true) {
    u_Blinn = gl.getUniformLocation(gl.program, 'u_Blinn');
    if (!u_Blinn) {
    console.log('Failed to get GPUs matrix storage locations');
    return;
    }
    gl.uniform1f(u_Blinn, on);
    
  } else
  {
    u_Blinn = gl.getUniformLocation(gl.program, 'u_Blinn');
    if (!u_Blinn) {
    console.log('Failed to get GPUs matrix storage locations');
    return;}
    gl.uniform1f(u_Blinn, off);
    
  }

  if(gouraud == true) {
    u_Gouraud = gl.getUniformLocation(gl.program, 'u_Gouraud');
    if (!u_Gouraud) {
    console.log('Failed to get GPUs matrix storage locations');
    return;}
    gl.uniform1f(u_Gouraud, on);
    
  }
  else
  {
    u_Gouraud = gl.getUniformLocation(gl.program, 'u_Gouraud');
    if (!u_Gouraud) {
    console.log('Failed to get GPUs matrix storage locations');
    return;}
    gl.uniform1f(u_Gouraud, off);
  }

  u_Ground = gl.getUniformLocation(gl.program, 'u_Ground');
  u_ATT_opt = gl.getUniformLocation(gl.program, 'u_ATT_opt');

 /*gl.uniform3fv(uLoc_Ke, matl0.K_emit.slice(0,3));       // Ke emissive
  gl.uniform3fv(uLoc_Ka, matl0.K_ambi.slice(0,3));        // Ka ambient
  gl.uniform3fv(uLoc_Kd, matl0.K_diff.slice(0,3));        // Kd diffuse
  gl.uniform3fv(uLoc_Ks, matl0.K_spec.slice(0,3));        // Ks specular
  gl.uniform1i(uLoc_Kshiny, parseInt(matl0.K_shiny, 10));     // Kshiny 
  //  == specular exponent; (parseInt() converts from float to base-10 integer)*/

  //setMaterial(0);


	/*uLoc_Ke = gl.getUniformLocation(gl.program, 'u_MatlSet[0].emit');
	uLoc_Ka = gl.getUniformLocation(gl.program, 'u_MatlSet[0].ambi');
	uLoc_Kd = gl.getUniformLocation(gl.program, 'u_MatlSet[0].diff');
	uLoc_Ks = gl.getUniformLocation(gl.program, 'u_MatlSet[0].spec');
	uLoc_Kshiny = gl.getUniformLocation(gl.program, 'u_MatlSet[0].shiny');

  uLoc_Ke1 = gl.getUniformLocation(gl.program, 'u_MatlSet[1].emit');
  uLoc_Ka1 = gl.getUniformLocation(gl.program, 'u_MatlSet[1].ambi');
  uLoc_Kd1 = gl.getUniformLocation(gl.program, 'u_MatlSet[1].diff');
  uLoc_Ks1 = gl.getUniformLocation(gl.program, 'u_MatlSet[1].spec');
  uLoc_Kshiny1 = gl.getUniformLocation(gl.program, 'u_MatlSet[1].shiny');

  uLoc_Ke2 = gl.getUniformLocation(gl.program, 'u_MatlSet[2].emit');
  uLoc_Ka2 = gl.getUniformLocation(gl.program, 'u_MatlSet[2].ambi');
  uLoc_Kd2 = gl.getUniformLocation(gl.program, 'u_MatlSet[2].diff');
  uLoc_Ks2 = gl.getUniformLocation(gl.program, 'u_MatlSet[2].spec');
  uLoc_Kshiny2 = gl.getUniformLocation(gl.program, 'u_MatlSet[2].shiny');
  */

  //uLoc_matlIndex = gl.getUniformLocation(gl.program, 'matlIndex');
	
	// Position the camera in world coordinates:


	draw();

  window.onresize = function() {
    gl = resizeCanvas();
    location.reload();
  }

	var tick = function() {
    gl = resizeCanvas();
    iterator = animate(iterator);
    draw();
    console.log('iterator=',iterator);
    requestAnimationFrame(tick, canvas);   
  };

  tick();

}

var g_EyeX = 0.0, g_EyeY = 3.0, g_EyeZ = 15.0;
var lookX = 0.0, lookY = 3.0, lookZ = -5.0;
var upX = 0.0, upY = 1.0, upZ = 0.0;

var lens_ang = 40;
var l0on = true;
var l1on = false;
var l2on = true;
var l3on = true;

var blinn = true;
var gouraud = true;

function draw() {
//-------------------------------------------------------------------------------
  // Send fresh 'uniform' values to the GPU:

	//---------------For the light source(s):
  eyePosWorld.set([g_EyeX, g_EyeY, g_EyeZ]);
  gl.uniform3fv(uLoc_eyePosWorld, eyePosWorld);

    //----------------For the Matrices: find the model matrix:
  //modelMatrix.setRotate(90, -1, 0, 0); // Rotate around the y-axis
  // Calculate the view projection matrix
  mvpMatrix.setPerspective(lens_ang, canvas.width/canvas.height, 1, 100);
  //gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  mvpMatrix.lookAt( g_EyeX, g_EyeY, g_EyeZ, // eye pos
                    lookX, lookY, lookZ,        // aim-point (in world coords)
                    upX, upY, upZ);       // up (in world coords)

	console.log(eyePosWorld);
	console.log(lookX, lookY, lookZ);
	console.log(upX, upY, upZ);



  //SEND OVER LAMPS (IF OFF, SET ALL VALUES TO ZERO)
  //HEADLIGHT

  if (l0on == true) {
    //u_L0on = gl.getUniformLocation(gl.program, 'u_L0on');
    //gl.uniform1f(u_L0on, 1.0);
    //lamp0.I_pos.elements.set( [eyePosWorld[0], eyePosWorld[2], eyePosWorld[1]]);
    lamp0.I_pos.elements.set( [g_EyeX, g_EyeY, g_EyeZ]);
    lamp0.I_ambi.elements.set([0.7, 0.7, 0.7]);
    lamp0.I_diff.elements.set([0.3, 0.3, 0.3]);
    lamp0.I_spec.elements.set([1.0, 1.0, 1.0]);
  } else
  {
    //u_L0on = gl.getUniformLocation(gl.program, 'u_L0on');
    //gl.uniform1f(u_L0on, 0.0);

    lamp0.I_pos.elements.set( [0.0, 0.0, 0.0]);
    lamp0.I_ambi.elements.set([0.0, 0.0, 0.0]);
    lamp0.I_diff.elements.set([0.0, 0.0, 0.0]);
    lamp0.I_spec.elements.set([0.0, 0.0, 0.0]);
  }

  //OVERHEAD LIGHT

  if (l1on == true) {
    //u_L1on = gl.getUniformLocation(gl.program, 'u_L1on');
    //gl.uniform1f(u_L1on, 1.0);

    lamp1.I_pos.elements.set( [0.0, 10.0, 0.0]);
    lamp1.I_ambi.elements.set([1.0, 0.4, 0.4]);
    lamp1.I_diff.elements.set([0.6, 0.6, 0.6]);
    lamp1.I_spec.elements.set([1.0, 1.0, 1.0]);
  } else
  {
    //u_L1on = gl.getUniformLocation(gl.program, 'u_L1on');
    //gl.uniform1f(u_L1on, 0.0);

    lamp1.I_pos.elements.set( [0.0, 0.0, 0.0]);
    lamp1.I_ambi.elements.set([0.0, 0.0, 0.0]);
    lamp1.I_diff.elements.set([0.0, 0.0, 0.0]);
    lamp1.I_spec.elements.set([0.0, 0.0, 0.0]);
  }

  //BACK LIGHT

  if (l2on == true) {
    //u_L2on = gl.getUniformLocation(gl.program, 'u_L2on');
    //gl.uniform1f(u_L2on, 1.0);

    lamp2.I_pos.elements.set( [-4.0, 4.0, -5.0]);
    lamp2.I_ambi.elements.set([0.4, 0.4, 1.0]);
    lamp2.I_diff.elements.set([0.6, 0.6, 0.6]);
    lamp2.I_spec.elements.set([1.0, 1.0, 1.0]);
  } else
  {
    //u_L2on = gl.getUniformLocation(gl.program, 'u_L2on');
    //gl.uniform1f(u_L2on, 0.0);

    lamp2.I_pos.elements.set( [0.0, 0.0, 0.0]);
    lamp2.I_ambi.elements.set([0.0, 0.0, 0.0]);
    lamp2.I_diff.elements.set([0.0, 0.0, 0.0]);
    lamp2.I_spec.elements.set([0.0, 0.0, 0.0]);
  }

  //POSITION/ATTRIBUTE ADJUSTABLE FRONT LIGHT

  if (l3on == true) {
    //u_L2on = gl.getUniformLocation(gl.program, 'u_L2on');
    //gl.uniform1f(u_L2on, 1.0);

    lamp3.I_pos.elements.set( [l3xpos, l3ypos, 5.0]);
    lamp3.I_ambi.elements.set([ambR, ambG, ambB]);
    lamp3.I_diff.elements.set([difR, difG, difB]);
    lamp3.I_spec.elements.set([specR, specG, specB]);
  } else
  {
    //u_L2on = gl.getUniformLocation(gl.program, 'u_L2on');
    //gl.uniform1f(u_L2on, 0.0);

    lamp3.I_pos.elements.set( [0.0, 0.0, 0.0]);
    lamp3.I_ambi.elements.set([0.0, 0.0, 0.0]);
    lamp3.I_diff.elements.set([0.0, 0.0, 0.0]);
    lamp3.I_spec.elements.set([0.0, 0.0, 0.0]);
  }


  gl.uniform3fv(lamp0.u_pos,  lamp0.I_pos.elements.slice(0,3));
  gl.uniform3fv(lamp0.u_ambi, lamp0.I_ambi.elements);		// ambient
  gl.uniform3fv(lamp0.u_diff, lamp0.I_diff.elements);		// diffuse
  gl.uniform3fv(lamp0.u_spec, lamp0.I_spec.elements);		// Specular

  gl.uniform3fv(lamp1.u_pos,  lamp1.I_pos.elements.slice(0,3));
  gl.uniform3fv(lamp1.u_ambi, lamp1.I_ambi.elements);   // ambient
  gl.uniform3fv(lamp1.u_diff, lamp1.I_diff.elements);   // diffuse
  gl.uniform3fv(lamp1.u_spec, lamp1.I_spec.elements);   // Specular

  gl.uniform3fv(lamp2.u_pos,  lamp2.I_pos.elements.slice(0,3));
  gl.uniform3fv(lamp2.u_ambi, lamp2.I_ambi.elements);   // ambient
  gl.uniform3fv(lamp2.u_diff, lamp2.I_diff.elements);   // diffuse
  gl.uniform3fv(lamp2.u_spec, lamp2.I_spec.elements);   // Specular

  gl.uniform3fv(lamp3.u_pos,  lamp3.I_pos.elements.slice(0,3));
  gl.uniform3fv(lamp3.u_ambi, lamp3.I_ambi.elements);   // ambient
  gl.uniform3fv(lamp3.u_diff, lamp3.I_diff.elements);   // diffuse
  gl.uniform3fv(lamp3.u_spec, lamp3.I_spec.elements);   // Specular


  //SEND CURRENT BLINN AND GOURAUD SELECTIONS
  if(blinn == true) {
    gl.uniform1f(u_Blinn, on);
  } else {
    gl.uniform1f(u_Blinn, off);
  }

  if(gouraud == true) {
    gl.uniform1f(u_Gouraud, on);
  } else {
    gl.uniform1f(u_Gouraud, off);
  }

  //SEND CURRENT ATT OPTION
  gl.uniform1f(u_ATT_opt, att_option);

  // Calculate the matrix to transform the normal based on the model matrix
  normalMatrix.setInverseOf(modelMatrix);
  normalMatrix.transpose();

  // Send the new matrix values to their locations in the GPU:
  //gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
  gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
  drawScene();
  gl.uniformMatrix4fv(uLoc_MvpMatrix, false, mvpMatrix.elements);
  gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
}



function drawScene() {
	"use strict";

  // Clear color and depth buffer
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Draw the cube
  //gl.drawElements(gl.TRIANGLES, n_vcount, gl.UNSIGNED_SHORT, 0);

  gl.uniform1f(u_Ground, 0.0);
  //---------**VARIABLES**---------

  var sq2 = Math.sqrt(2.0); 
  
  //global shape variables:

  var offset = 5.0; //determines positioning of entire snake object
  var all_scale = 0.5; //determines scale of entire snake object

  //counter variables:

  var i = 0; //counter for straight links
  var j = 0; //counter for curved links
  var k = 0; //counter for rattle
 
 class Sum {
  constructor(i, j, k) {
    this.i = i;
    this.j = j;
    this.k = k;
  }
  update_sum(i, j, k) {
    this.i = i;
    this.j = j;
    this.k = k;
  }
  set_param(x, field) {
    this.field = x; 
  }
  val(){
    return i + j + k;
  }
}

  var sum = new Sum(i, j, k);


  //length and bend variables:

  var num_sLinks = 40; //sets length of straight section
  var num_cLinks = 20; //sets length of curved section
  var num_rLinks = 4; //sets length of rattle

  var total_links = num_sLinks + num_cLinks + num_rLinks;
  var linkSum = new Sum(num_sLinks, num_cLinks, num_rLinks);

  var bend_point = 35; //sets how far down the snake the bend begins
  var rattle_buffer = 10; //sets how far down from back end the rattle motion originates from
  var rattle_point = total_links - rattle_buffer; //indexes this on the full set of links
  var bend_angle = 1.42; //adjusts steepness of bend

  //if (bend_off == true) {
  //  bend_point = total_links + 1;
  //}

  //movement pattern variables:

  var slither_rate = 0.2; //determines base rate of slither
  var slither_range = 15; //range of movement of slither
  var slither_coefficient = 1.1; //determines "waviness" vs. "stiffness" (see below)
  //if lower, slither will be more like a see-saw, if higher, slither will look more like a wave
  var slither_consistent = 0.4; //determines regularity/consistency of wave across links (see below)
  //if higher, links further out from origin will move more dramatically than those closer
  //if lower, links will move more consistenly
   var sc_pow = 0.55;

//---------**FUNCTIONS**----------

  //slither funciton:
    //rotation uses a sine function to get snake to move in oscilatting pattern
    //power function's (sum.val() + 1) term has a 1 added so that the term doesn't equal 0
    //is offset from the head and the remaining links have the same offset

    //"originDirection" resolves issue with object's initial position in relation to the origin and how that affects rotations
    //for front end of head, originDirection should be 1
    //for back end of head and tail, originDirection should be -1

    //may be a missing translation element of this, but not that I'v ebeen able to get to work

  function slither(inputMatrix, originDirection) {
    var x_buffer = 0;
    var y_buffer = 0;

    if (x_movement == true) {
      x_buffer = 1;
    }
    if (y_movement == true) {
      y_buffer = 1;
    }
    if (x_buffer == 0 && y_buffer == 0) {
      return;
    } else {
    inputMatrix.rotate(slither_range*Math.sin(slither_coefficient*
    (slither_rate*iterator + slither_consistent*Math.pow(linkSum.val(), sc_pow))), -originDirection*x_buffer, -originDirection*y_buffer, 0);
}
}

  //bend function:
    //bends links for tail rattle at a point determined by bend_point

  function bend(inputMatrix, index) {
    if (index > bend_point) {
      inputMatrix.rotate(-0.1*Math.pow((1.2 * (index - bend_point)), bend_angle), 0, 0, 1);
    }
    //if (rattleOn == true) {
      if (index > rattle_point) {
        inputMatrix.rotate(0.115*Math.pow(1.43, (index - rattle_point))*Math.sin(0.78*iterator + 0.6*Math.pow((index - rattle_point), 0.15)),1, 0, 0);
//above floats are: :range coeff.:      :diff b/n ranges:                        :speed:        :movement within range:               :diff. b/n movements:
    //}
  }
  }
  //positioning function:
    //rotates, scales and translates all objects by uniform values

  function positioning(inputMatrix, originDirection) {
    inputMatrix.translate(0.0, 0.0, 0.0);
    inputMatrix.scale(1,1,-1);
    inputMatrix.rotate(90, 0, originDirection, 0);
  }

  //mDrag:
    //rotates shape as mouse is dragged on canvas

  function mDrag(inputMatrix, originDirection) {
    var dist = Math.sqrt(xMdragTot*xMdragTot + yMdragTot*yMdragTot);
    inputMatrix.rotate(dist*120.0,0.0, -originDirection*xMdragTot+0.0001, yMdragTot+0.0001);
  }

  //size_osc:
    //makes snake oscillate between fatter/skinnier in animation

  function size_osc(inputMatrix) {
    var max_size_coef = 0.68;
    var ratio_coef = 0.025;
    var grow_speed_coef = 0.045;
    //if (sizeChange == true) {
    //  var new_x = 1.0 + i*ratio_coef + max_size_coef*(Math.sin(grow_speed_coef*iterator)*(i*ratio_coef));
    //  var new_y = new_x;
    //  inputMatrix.scale(new_x, new_y, 1);
   // }
  }

//---------**MATRICES**---------


  //----Front Triangle Fan (Head)----

  modelMatrix.setRotate(90, -1, 0, 0); 
  if (dragSnake == true) {
    mDrag(modelMatrix, 1);
  }
  positioning(modelMatrix, 1);
  slither(modelMatrix, 1);
  modelMatrix.scale(all_scale, all_scale, all_scale); //all scale
  normalMatrix.setInverseOf(modelMatrix);
  normalMatrix.transpose();

  matl2_Ke.set(matl2.K_emit.slice(0,3));
  matl2_Ka.set(matl2.K_ambi.slice(0,3));
  matl2_Kd.set(matl2.K_diff.slice(0,3));
  matl2_Ks.set(matl2.K_spec.slice(0,3));
  matl2_Kshiny = parseInt(matl2.K_shiny, 10);                          // Specular shinyness exponent
  // then use those global vars to set 'uniform' vars in the GPU:
  gl.uniform3fv(uLoc_Ke, matl2_Ke);       // Ke emissive
  gl.uniform3fv(uLoc_Ka, matl2_Ka);       // Ka ambient
  gl.uniform3fv(uLoc_Kd, matl2_Kd);       // Kd diffuse
  gl.uniform3fv(uLoc_Ks, matl2_Ks);       // Ks specular
  gl.uniform1i(uLoc_Kshiny, matl2_Kshiny);          // Kshiny shinyness exponent

  gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
  gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.TRIANGLE_FAN, 26, 14);


  //----Front Cone Triangle Strip (Head)----

  modelMatrix.setRotate(90, -1, 0, 0);
  if (dragSnake == true) {
    mDrag(modelMatrix, 1);
  }
  positioning(modelMatrix, 1);
  slither(modelMatrix, 1);
  modelMatrix.scale(all_scale, all_scale, all_scale);  //all scale
  normalMatrix.setInverseOf(modelMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
  gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 26);
  

  //----Back Cone Triangle Strip (Head)----

  modelMatrix.setRotate(90, -1, 0, 0);
  if (dragSnake == true) {
    mDrag(modelMatrix, 1);
  }
  positioning(modelMatrix, -1);
  slither(modelMatrix, -1);
  modelMatrix.scale(all_scale, all_scale, all_scale); //all scale
  normalMatrix.setInverseOf(modelMatrix);
  normalMatrix.transpose();


  gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
  gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 26);


  //----Straight Body Cylinders----

  for(i = 0; i < num_sLinks; i++) {

  modelMatrix.setRotate(90, -1, 0, 0);
  if (dragSnake == true) {
    mDrag(modelMatrix, 1);
  }  
  positioning(modelMatrix, -1);
  
  slither(modelMatrix, -1);  
  bend(modelMatrix, sum.val());

  modelMatrix.scale(all_scale, all_scale, all_scale); //all scale
  size_osc(modelMatrix);
  modelMatrix.translate(0.0, 0.0, (0.5 * sum.val()));
  normalMatrix.setInverseOf(modelMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
  gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.TRIANGLE_STRIP, 40, 26);
}

  //----Tapered Body Cones----

  for(j = 0; j < num_cLinks; j++) {

  modelMatrix.setRotate(90, -1, 0, 0);
  if (dragSnake == true) {
    mDrag(modelMatrix, 1);
  }
  positioning(modelMatrix, -1);

  slither(modelMatrix, -1);
  bend(modelMatrix, sum.val());

  modelMatrix.scale(all_scale, all_scale, all_scale); //all scale
  size_osc(modelMatrix);
  modelMatrix.scale(Math.pow(taper,j),Math.pow(taper,j),1);
  modelMatrix.translate(0.0, 0.0, (0.5 * sum.val()));
  normalMatrix.setInverseOf(modelMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
  gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.TRIANGLE_STRIP, 66, 26);
}


  //----Rattle Cones----

  for(k = 0; k < num_rLinks; k++) {

  modelMatrix.setRotate(90, -1, 0, 0); 
  if (dragSnake == true) {
    mDrag(modelMatrix, 1);
  } 
  positioning(modelMatrix, -1);

  slither(modelMatrix, -1);
  bend(modelMatrix, sum.val());

  modelMatrix.scale(all_scale, all_scale, all_scale); //all scale
  //size_osc(modelMatrix);
  modelMatrix.scale(1.23*Math.pow((taper - 0.14),k),1.23*Math.pow((taper - 0.14),k),1); //(taper - n) function gives rattle components
  //separation from each other so that it looks like a rattle rather than a snake body part. Initial coefficient scales overall size
  modelMatrix.translate(0.0, 0.0, (0.5 * sum.val()));
  normalMatrix.setInverseOf(modelMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
  gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.TRIANGLE_STRIP, 66, 26);
}


//===========================FLOWER FUNCTIONS=====================================
  

//---------**VARIABLES**---------

  var scale_down_flower = 0.12;
  var scale_down_center = 0.24;

  var full_flow_scale = 5.0;

  var stem_length = 10;

  var p_list = [15, 25, 35, 45];
  var rows = p_list.length;

  var f = 0;
  var g = 0;

  var h = 0;
  var flow_ground = -3.2;


//---------**FUNCTIONS**---------
/*
function flower_setup(inputMatrix) {
  inputMatrix.setTranslate(0.0, 0.5, 0);
  inputMatrix.scale(scale_down_flower, scale_down_flower, scale_down_flower);
}

function center_setup(inputMatrix, orientation) {
  inputMatrix.scale(scale_down_center, scale_down_center, scale_down_center);
  inputMatrix.rotate(90, orientation, 0, 0);
}
*/

function flower_rotate(inputMatrix)
{
  inputMatrix.rotate(7*Math.pow((stem_length - 1 + 0.2), 0.4)*Math.sin((0.15)*iterator), 0, 0, 1);
}

//standard transformations for components in the middle of the flower:

function fcenter_trans1(inputMatrix) {
    inputMatrix.translate(0.5, 0, 0);
    inputMatrix.rotate(-40, 1, 0, 0);
    inputMatrix.rotate(180, 1, 0, 0);
    inputMatrix.translate(0.0, -0.6, 0.0);
}

//standard transformations for components in the middle of the flower after animated rotation:

function fcenter_trans2(inputMatrix) {
    inputMatrix.translate(0, a + 0.015, 0);
    
    npScale(inputMatrix);
    inputMatrix.rotate(90, 1, 0, 0);
    inputMatrix.translate(0.0, 0.0, 32.5);
}

//scale operations for all non-petal components
function npScale(inputMatrix) {
    inputMatrix.scale(scale_down_flower, scale_down_flower, scale_down_flower);
    inputMatrix.scale(scale_down_center, scale_down_center, scale_down_center);
}

function fDrag(inputMatrix, originDirection) {
    var dist = Math.sqrt(xMdragTot*xMdragTot + yMdragTot*yMdragTot);
    inputMatrix.rotate(dist*120.0,yMdragTot+0.0001, 0.0, originDirection*xMdragTot*1.5+0.0001);
}

function move_options(inputMatrix) {
    if(dragFlow == true) {
      fDrag(inputMatrix, 1);
    }
    if (stemMove == true) {
      flower_rotate(inputMatrix);
    }
}

//---------**MATRICES**---------

  //PETALS:

  var a = stem_length*scale_down_center*scale_down_flower*1.586; //1.586 is (3 - sqrt(2)), which is the initial length of a stem link

  var num_flows = 1;
  var r = 0;

  for (r = 0; r < num_flows; r ++) {

  for(f = 0; f < rows; f++) {
  
    var num_petals = p_list[f];

    for(g = 0; g < num_petals; g ++) {

    modelMatrix.setRotate(90, -1, 0, 0);
    modelMatrix.translate(Math.cos(r), Math.sin(r), flow_ground);
    modelMatrix.scale(full_flow_scale, full_flow_scale, full_flow_scale);
    modelMatrix.translate(0.5, 0.0, 0.0);
    modelMatrix.rotate(90, 1, 0, 0);
    modelMatrix.rotate(-40, 1, 0, 0);
    modelMatrix.rotate(180, 1, 0, 0);
    modelMatrix.translate(0.0, -0.6, 0.0);
    move_options(modelMatrix);

    modelMatrix.rotate(180, 0, 0, 1);
    modelMatrix.translate(0, a, 0);
    modelMatrix.scale(0.5*f, 0.5*f, 0.5*f);
    //iterates petals around petal row
    modelMatrix.rotate(g*(360/num_petals), 0, 1, 0);
    modelMatrix.scale(scale_down_flower, scale_down_flower, scale_down_flower); //all scale
    modelMatrix.translate(0, 0.0, 0);

    if (petalBloom == true) {
      //below causes petals to bloom/unbloom:
      modelMatrix.rotate(45*Math.sin(iterator/20) + 12 +10*(rows - f), 0, -1, 1);
    }
    normalMatrix.setInverseOf(modelMatrix);
    normalMatrix.transpose();

    matl1_Ke.set(matl1.K_emit.slice(0,3));
    matl1_Ka.set(matl1.K_ambi.slice(0,3));
    matl1_Kd.set(matl1.K_diff.slice(0,3));
    matl1_Ks.set(matl1.K_spec.slice(0,3));
    matl1_Kshiny = parseInt(matl1.K_shiny, 10);                          // Specular shinyness exponent
    // then use those global vars to set 'uniform' vars in the GPU:
    gl.uniform3fv(uLoc_Ke, matl1_Ke);       // Ke emissive
    gl.uniform3fv(uLoc_Ka, matl1_Ka);       // Ka ambient
    gl.uniform3fv(uLoc_Kd, matl1_Kd);       // Kd diffuse
    gl.uniform3fv(uLoc_Ks, matl1_Ks);       // Ks specular
    gl.uniform1i(uLoc_Kshiny, matl1_Kshiny);          // Kshiny shinyness exponent

    gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
    gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, 92, 4);
}
}


    //FLOWER CENTER RING:

    modelMatrix.setRotate(90, -1, 0, 0);
    modelMatrix.translate(Math.cos(r), Math.sin(r), flow_ground);
    modelMatrix.scale(full_flow_scale, full_flow_scale, full_flow_scale);
    modelMatrix.rotate(90, 1, 0, 0);
    
    fcenter_trans1(modelMatrix);
    move_options(modelMatrix);
    fcenter_trans2(modelMatrix);
    normalMatrix.setInverseOf(modelMatrix);
    normalMatrix.transpose();
    gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
    gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, 96, 26);



    //FLOWER CENTER TOP:

    modelMatrix.setRotate(90, -1, 0, 0);
    modelMatrix.translate(Math.cos(r), Math.sin(r), flow_ground);
    modelMatrix.scale(full_flow_scale, full_flow_scale, full_flow_scale);
    modelMatrix.rotate(90, 1, 0, 0);
    
    fcenter_trans1(modelMatrix);
    move_options(modelMatrix);
    fcenter_trans2(modelMatrix);
    normalMatrix.setInverseOf(modelMatrix);
    normalMatrix.transpose();
    gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
    gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_FAN, 122, 14);


    //FLOWER STEM CONNECTOR:

    modelMatrix.setRotate(90, -1, 0, 0);
    modelMatrix.translate(Math.cos(r), Math.sin(r), flow_ground);
    modelMatrix.scale(full_flow_scale, full_flow_scale, full_flow_scale);
    modelMatrix.rotate(90, 1, 0, 0);
    fcenter_trans1(modelMatrix);
    move_options(modelMatrix);
    modelMatrix.rotate(180, 0, 0, 1);
    modelMatrix.translate(0, a + 0.015, 0);

    npScale(modelMatrix);
    modelMatrix.rotate(90, 1, 0, 0);

    modelMatrix.translate(0, 0.1, 0.4);
    normalMatrix.setInverseOf(modelMatrix);
    normalMatrix.transpose();
    gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
    gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, 136, 26);

    
    //FLOWER STEM BODY

    for (h = 0; h < stem_length; h++) {

    modelMatrix.setRotate(90, -1, 0, 0);
    modelMatrix.translate(Math.cos(r), Math.sin(r), flow_ground);
    modelMatrix.scale(full_flow_scale, full_flow_scale, full_flow_scale);
    modelMatrix.translate(0.5, 0.0, 0.0);
    modelMatrix.rotate(90, 1, 0, 0);
    modelMatrix.rotate(-40, 1, 0, 0);
    modelMatrix.rotate(180, 1, 0, 0);
    modelMatrix.translate(0.0, -0.6, 0.0);

    if(dragFlow == true) {
      fDrag(modelMatrix, 1);
    }

    npScale(modelMatrix);
    modelMatrix.scale(1, 1, 1.5);

    if (stemMove == true) {
      modelMatrix.rotate(7*Math.pow((stem_length - h - 1 + 0.2), 0.4)*Math.sin((0.15)*iterator), 0, 0, 1);
    }
    modelMatrix.rotate(90, 1, 0, 0);
    modelMatrix.translate(0, 0, 1.586*(stem_length - h -2));
    normalMatrix.setInverseOf(modelMatrix);
    normalMatrix.transpose();
    gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
    gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, 162, 26);
  }

    matl0_Ke.set(matl0.K_emit.slice(0,3));
    matl0_Ka.set(matl0.K_ambi.slice(0,3));
    matl0_Kd.set(matl0.K_diff.slice(0,3));
    matl0_Ks.set(matl0.K_spec.slice(0,3));
    matl0_Kshiny = parseInt(matl0.K_shiny, 10);                          // Specular shinyness exponent
    // then use those global vars to set 'uniform' vars in the GPU:
    gl.uniform3fv(uLoc_Ke, matl0_Ke);       // Ke emissive
    gl.uniform3fv(uLoc_Ka, matl0_Ka);       // Ka ambient
    gl.uniform3fv(uLoc_Kd, matl0_Kd);       // Kd diffuse
    gl.uniform3fv(uLoc_Ks, matl0_Ks);       // Ks specular
    gl.uniform1i(uLoc_Kshiny, matl0_Kshiny);          // Kshiny shinyness exponent

  }

  if (numFish > 0) {
    draw_fish(numFish);
  }

  function fish_trans(modelMatrix, dir, fish_num) {
    modelMatrix.rotate(Math.pow(-1, (i+1))*iterator*2*((fish_num+20)/19), 0, 1, 0);
    modelMatrix.translate(3.0 + (i/2), 0.0, 0.0);
    modelMatrix.rotate(90*Math.pow(-1, i), 0, 1, 0);
    modelMatrix.rotate(dir*10*Math.sin(iterator/2), 0, 1, 0);
    modelMatrix.scale(0.6, 0.6, 0.6);

    normalMatrix.setInverseOf(modelMatrix);
    normalMatrix.transpose();
    gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
  }

function draw_fish(num_fish) {
  for (i = 0; i < num_fish; i++) {

    //=====FISH=====//

    //Section 1 (front/mouth)

    modelMatrix.setTranslate(0.0, 1.0 + (0.2 * i), 0.0);
    fish_trans(modelMatrix, -1, i);
    gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 188, 45);

    //Section 2

    modelMatrix.setTranslate(0.0, 1.0 + (0.2 * i), 0.0);
    fish_trans(modelMatrix, -1, i);
    gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, 233, 18);

    //Section 3

    modelMatrix.setTranslate(0.0, 1.0 + (0.2 * i), 0.0);
    fish_trans(modelMatrix, -1, i);
    gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, 251, 18);

    //Section 4

    modelMatrix.setTranslate(0.0, 1.0 + (0.2 * i), 0.0);
    fish_trans(modelMatrix, -1, i);
    gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, 269, 18);

    //Section 5

    modelMatrix.setTranslate(0.0, 1.0 + (0.2 * i), 0.0);
    fish_trans(modelMatrix, -1, i);
    gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, 287, 18);

    //Section 6

    modelMatrix.setTranslate(0.0, 1.0 + (0.2 * i), 0.0);
    fish_trans(modelMatrix, -1, i);
    gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLE_STRIP, 305, 18);

    //Fin

    modelMatrix.setTranslate(0.0, 1.0 + (0.2 * i), 0.0);
    fish_trans(modelMatrix, -1, i);
    gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
    gl.drawArrays(gl.TRIANGLES, 323, 15);
  }
}



  matl0_Ke.set(Material(MATL_RED_PLASTIC).K_emit.slice(0,3));
  matl0_Ka.set(Material(MATL_RED_PLASTIC).K_ambi.slice(0,3));
  matl0_Kd.set(Material(MATL_RED_PLASTIC).K_diff.slice(0,3));
  matl0_Ks.set(Material(MATL_RED_PLASTIC).K_spec.slice(0,3));
  matl0_Kshiny = parseInt(Material(MATL_RED_PLASTIC).K_shiny, 10);                          // Specular shinyness exponent
    // then use those global vars to set 'uniform' vars in the GPU:
  gl.uniform3fv(uLoc_Ke, matl0_Ke);       // Ke emissive
  gl.uniform3fv(uLoc_Ka, matl0_Ka);       // Ka ambient
  gl.uniform3fv(uLoc_Kd, matl0_Kd);       // Kd diffuse
  gl.uniform3fv(uLoc_Ks, matl0_Ks);       // Ks specular
  gl.uniform1i(uLoc_Kshiny, matl0_Kshiny);          // Kshiny shinyness exponent


  //=====GROUND======//

  gl.uniform1f(u_Ground, 1.0);
  //modelMatrix.setRotate(90, -1, 0, 0);
  modelMatrix.setTranslate(0.0, -1.0, 0.0);
  normalMatrix.setInverseOf(modelMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
  gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
  
//OLD GROUND GRID//
  /*gl.drawArrays(gl.TRIANGLE_STRIP,							
  							gndStart/floatsPerVertex,	
  							gndVerts.length/floatsPerVertex);*/

  gl.drawArrays(gl.TRIANGLE_FAN,              
                338, 
                4);

  /*modelMatrix.setTranslate(0.0, 0.0, 0.0);
  modelMatrix.rotate(90, -1, 0, 0);
  normalMatrix.setInverseOf(modelMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
  gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.LINES,              
                gndStart/floatsPerVertex, 
                gndVerts.length/floatsPerVertex) */
  
//OLD GROUND GRID//
  /*gl.drawArrays(gl.TRIANGLE_STRIP,              
                gndStart/floatsPerVertex, 
                gndVerts.length/floatsPerVertex);*/


    /*matl0_Ke.set(matl0.K_emit.slice(0,3));
    matl0_Ka.set(matl0.K_ambi.slice(0,3));
    matl0_Kd.set(matl0.K_diff.slice(0,3));
    matl0_Ks.set(matl0.K_spec.slice(0,3));
    matl0_Kshiny = parseInt(matl0.K_shiny, 10);                          // Specular shinyness exponent
    // then use those global vars to set 'uniform' vars in the GPU:
    gl.uniform3fv(uLoc_Ke, matl0_Ke);       // Ke emissive
    gl.uniform3fv(uLoc_Ka, matl0_Ka);       // Ka ambient
    gl.uniform3fv(uLoc_Kd, matl0_Kd);       // Kd diffuse
    gl.uniform3fv(uLoc_Ks, matl0_Ks);       // Ks specular
    gl.uniform1i(uLoc_Kshiny, matl0_Kshiny);          // Kshiny shinyness exponent*/

  gl.uniform1f(u_Ground, 0.0);
  
  modelMatrix.setTranslate(0, 5, 0);
  normalMatrix.setInverseOf(modelMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(uLoc_NormalMatrix, false, normalMatrix.elements);
  gl.uniformMatrix4fv(uLoc_ModelMatrix, false, modelMatrix.elements);
  gl.drawArrays(gl.TRIANGLE_STRIP,              
                sphStart/floatsPerVertex, 
                sphVerts.length/floatsPerVertex);



}

var taper = 0.97

function initVertexBuffers(gl) {
//-------------------------------------------------------------------------------
  var sq2	= Math.sqrt(2.0);						 
  var colorShapes = new Float32Array([

  //Open Cone Triangle Strip
  0.0, 1.0, 0.0,   0.0,  1.0,  0.4, //Node 0a
  0.0*0.6, 1.0*0.6, sq2,  0.0,  1.0,  0.0, //Node 0b
  -0.5,  0.866, 0.0,     0.1,  1.0,  0.4, //Node 1a

  -0.5*0.6,  0.866*0.6, sq2,    0.1,  1.0,  0.0, //Node 1b
  -0.866, 0.5, 0.0,    0.2,  1.0,  0.4, //Node 2a

  -0.866*0.6, 0.5*0.6, sq2,   0.2,  1.0,  0.0, //Node 2b
   -1.0, 0.0, 0.0, 0.4,  1.0,  0.4, //Node 3a

  -1.0*0.6, 0.0*0.6, sq2,    0.4,  1.0,  0.0, //Node 3b
  -0.866, -0.5, 0.0,     0.5,  1.0,  0.4, //Node 4a

  -0.866*0.6, -0.5*0.6, sq2,   0.5,  1.0,  0.0, //Node 4b
  -0.5,  -0.866, 0.0,    0.7,  1.0,  0.4, //Node 5a

  -0.5*0.6,  -0.866*0.6, sq2,   0.7,  1.0,  0.0, //Node 5b
  0.0, -1.0, 0.0,   0.9,  1.0,  0.4, //Node 6a

  0.0*0.6, -1.0*0.6, sq2,  0.9,  1.0,  0.0, //Node 6b
  0.5,  -0.866, 0.0,    0.7,  1.0,  0.4, //Node 7a

  0.5*0.6,  -0.866*0.6, sq2,    0.7,  1.0,  0.0, //Node 7b
  0.866, -0.5, 0.0,  0.5,  1.0,  0.4, //Node 8a

  0.866*0.6, -0.5*0.6, sq2,   0.5,  1.0,  0.0, //Node 8b
  1.0,  0.0, 0.0,   0.4,  1.0,  0.4, //Node 9a

  1.0*0.6,  0.0*0.6, sq2,      0.4,  1.0,  0.0, //Node 9b
  0.866, 0.5, 0.0,   0.2,  1.0,  0.4, //Node 10a

  0.866*0.6, 0.5*0.6, sq2,   0.2,  1.0,  0.0, //Node 10b
  0.5, 0.866, 0.0,   0.1,  1.0,  0.4, //Node 11a

  0.5*0.6, 0.866*0.6, sq2,   0.1,  1.0,  0.4, //Node 11b

  0.0, 1.0, 0.0, 0.0,  1.0,  0.4, //Node 0a
  0.0*0.6, 1.0*0.6, sq2,  0.0,  1.0,  0.0, //Node 0b

  //Front Open Cone Triangle Fan:

  0.0, 0.0, 1.8, 1.0,  1.0,  0.0,// Center Top

  0.0*0.6, 1.0*0.6, sq2,   0.0,  1.0,  0.0, //Node 0b
  -0.5*0.6,  0.866*0.6, sq2,     0.1,  1.0,  0.0, //Node 1b
  -0.866*0.6, 0.5*0.6, sq2,    0.2,  1.0,  0.0, //Node 2b
  -1.0*0.6, 0.0*0.6, sq2,     0.1,  1.0,  0.0, //Node 3b
  -0.866*0.6, -0.5*0.6, sq2,    0.5,  1.0,  0.0, //Node 4b
  -0.5*0.6,  -0.866*0.6, sq2,    0.7,  1.0,  0.0, //Node 5b

  0.0*0.6, -1.0*0.6, sq2,   0.8,  1.0,  0.0, //Node 6b
  0.5*0.6,  -0.866*0.6, sq2,    0.7,  1.0,  0.0, //Node 7b
  0.866*0.6, -0.5*0.6, sq2,   0.5,  1.0,  0.0, //Node 8b
  1.0*0.6,  0.0*0.6, sq2,    0.4,  1.0,  0.0, //Node 9b
  0.866*0.6, 0.5*0.6, sq2,   0.2,  1.0,  0.0, //Node 10b
  0.5*0.6, 0.866*0.6, sq2,     0.1,  1.0,  0.0, //Node 11b
  0.0*0.6, 1.0*0.6, sq2,    0.0,  1.0,  0.0, //Node 0b

  //Body Cylinder Triangle Strip


  0.0*0.6, 1.0*0.6, sq2,    0.0,  1.0,  0.5, //Node 0b
  0.0*0.6, 1.0*0.6, (sq2 + 0.5),  1.0,  1.0,  0.0, //Node 0c
  -0.5*0.6,  0.866*0.6, sq2,    0.0,  1.0,  0.5, //Node 1b
  -0.5*0.6,  0.866*0.6, (sq2 + 0.5),    1.0,  1.0,  0.0, //Node 1c
  -0.866*0.6, 0.5*0.6, sq2,   0.3,  1.0,  0.4, //Node 2b
  -0.866*0.6, 0.5*0.6, (sq2 + 0.5),  1.0,  1.0,  0.0, //Node 2c
  -1.0*0.6, 0.0*0.6, sq2,   0.5,  1.0,  0.5, //Node 3b
  -1.0*0.6, 0.0*0.6, (sq2 + 0.5),   1.0,  0.8,  0.0, //Node 3c
  -0.866*0.6, -0.5*0.6, sq2,   0.7,  1.0,  0.3, //Node 4b
  -0.866*0.6, -0.5*0.6, (sq2 + 0.5),  1.0,  0.7,  0.0, //Node 4c
  -0.5*0.6,  -0.866*0.6, sq2, 1.0,  1.0,  0.1, //Node 5b
  -0.5*0.6,  -0.866*0.6, (sq2 + 0.5),   1.0,  0.4,  0.0, //Node 5c

  0.0*0.6, -1.0*0.6, sq2, 1.0,   1.0,  0.1, //Node 6b
  0.0*0.6, -1.0*0.6, (sq2 + 0.5), 1.0,  0.4,  0.0, //Node 6c
  0.5*0.6,  -0.866*0.6, sq2, 0.7,  1.0,  0.3, //Node 7b
  0.5*0.6,  -0.866*0.6, (sq2 + 0.5),   1.0,  0.7,  0.0, //Node 7c
  0.866*0.6, -0.5*0.6, sq2,   0.5,  1.0,  0.5, //Node 8b
  0.866*0.6, -0.5*0.6, (sq2 + 0.5), 1.0,  0.8,  0.0, //Node 8c
  1.0*0.6,  0.0*0.6, sq2,   0.3,  1.0,  0.4, //Node 9b
  1.0*0.6,  0.0*0.6, (sq2 + 0.5),    1.0,  1.0,  0.0, //Node 9c
  0.866*0.6, 0.5*0.6, sq2,  0.0,  1.0,  0.5, //Node 10b
  0.866*0.6, 0.5*0.6, (sq2 + 0.5),   1.0,  1.0,  0.0, //Node 10c
  0.5*0.6, 0.866*0.6, sq2,  0.0,  1.0,  0.5, //Node 11b
  0.5*0.6, 0.866*0.6, (sq2 + 0.5), 1.0,  1.0,  0.0, //Node 11c

  0.0*0.6, 1.0*0.6, sq2,  0.0,  1.0,  0.5, //Node 0b
  0.0*0.6, 1.0*0.6, (sq2 + 0.5),  1.0,  1.0,  0.0, //Node 0c

  //Body Cone Triangle Strip

  0.0*0.6, 1.0*0.6, sq2,  0.0,  1.0,  0.5, //Node 0b
  0.0*0.6*taper, 1.0*0.6*taper, (sq2 + 0.5),  1.0,  1.0,  0.0, //Node 0d
  -0.5*0.6,  0.866*0.6, sq2,  0.0,  1.0,  0.5, //Node 1b
  -0.5*0.6*taper,  0.866*0.6*taper, (sq2 + 0.5),  1.0,  1.0,  0.0, //Node 1d
  -0.866*0.6, 0.5*0.6, sq2, 0.3,  1.0,  0.4, //Node 2b
  -0.866*0.6*taper, 0.5*0.6*taper, (sq2 + 0.5),  1.0,  1.0,  0.0, //Node 2d
  -1.0*0.6, 0.0*0.6, sq2,  0.5,  1.0,  0.5, //Node 3b
  -1.0*0.6*taper, 0.0*0.6*taper, (sq2 + 0.5), 1.0,  0.8,  0.0, //Node 3d
  -0.866*0.6, -0.5*0.6, sq2,   0.7,  1.0,  0.3, //Node 4b
  -0.866*0.6*taper, -0.5*0.6*taper, (sq2 + 0.5),  1.0,  0.7,  0.0, //Node 4d
  -0.5*0.6,  -0.866*0.6, sq2,   1.0,  1.0,  0.1, //Node 5b
  -0.5*0.6*taper,  -0.866*0.6*taper, (sq2 + 0.5),  1.0,  0.4,  0.0, //Node 5d

  0.0*0.6, -1.0*0.6, sq2,  1.0,  1.0,  0.1, //Node 6b
  0.0*0.6*taper, -1.0*0.6*taper, (sq2 + 0.5), 1.0,  0.4,  0.0, //Node 6d
  0.5*0.6,  -0.866*0.6, sq2,   0.7,  1.0,  0.3, //Node 7b
  0.5*0.6*taper,  -0.866*0.6*taper, (sq2 + 0.5),   1.0,  0.7,  0.0, //Node 7d
  0.866*0.6, -0.5*0.6, sq2, 1.0, 0.5, 0.5, //Node 8b
  0.866*0.6*taper, -0.5*0.6*taper, (sq2 + 0.5),  1.0,  0.8,  0.0, //Node 8d
  1.0*0.6,  0.0*0.6, sq2,   0.3,  1.0,  0.4, //Node 9b
  1.0*0.6*taper,  0.0*0.6*taper, (sq2 + 0.5),   1.0,  1.0,  0.0, //Node 9d
  0.866*0.6, 0.5*0.6, sq2,  0.0,  1.0,  0.5, //Node 10b
  0.866*0.6*taper, 0.5*0.6*taper, (sq2 + 0.5),  1.0,  1.0,  0.0, //Node 10d
  0.5*0.6, 0.866*0.6, sq2,   0.0,  1.0,  0.5, //Node 11b
  0.5*0.6*taper, 0.866*0.6*taper, (sq2 + 0.5), 1.0,  1.0,  0.0, //Node 11d

  0.0*0.6, 1.0*0.6, sq2,  0.0,  1.0,  0.5, //Node 0b
  0.0*0.6*taper, 1.0*0.6*taper, (sq2 + 0.5),  1.0,  1.0,  0.0, //Node 0d

  //Flower Petal

  0.0, 0.0, 0.0,1.0, 1.0, 0.9, //origin
  0.35, 0.06, 0.15,1.0, 0.85, 0.85, //petal side
  0.35, 0.06, -0.15, 1.0, 0.9, 0.85, //petal side
  0.6, 0.2, 0.0, 1.0, 0.8, 0.7, //petal end

  //Flower Middle

  0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 
  0.4*0.0, 0.4*1.0, 0.2, 1.0, 0.7, 0.0, 

  -0.5, 0.866, 0.0, 1.0, 1.0, 0.0, 
  0.4*-0.5, 0.4*0.866, 0.2, 1.0, 0.7, 0.0, 

  -0.866, 0.5, 0.0, 1.0, 1.0, 0.0, 
  0.4*-0.866, 0.4*0.5, 0.2, 1.0, 0.7, 0.0, 

  -1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 
  0.4*-1.0, 0.4*0.0, 0.2, 1.0, 0.7, 0.0, 

  -0.866, -0.5, 0.0, 1.0, 1.0, 0.0, 
  0.4*-0.866, 0.4*-0.5, 0.2, 1.0, 0.7, 0.0,

  -0.5, -0.866, 0.0, 1.0, 1.0, 0.0, 
  0.4*-0.5, 0.4*-0.866, 0.2, 1.0, 0.7, 0.0, 


  0.0, -1.0, 0.0, 1.0, 1.0, 0.0, 
  0.4*0.0, 0.4*-1.0, 0.2, 1.0, 0.7, 0.0, 

  0.5, -0.866, 0.0, 1.0, 1.0, 0.0, 
  0.4*0.5, 0.4*-0.866, 0.2, 1.0, 0.7, 0.0, 

  0.866, -0.5, 0.0, 1.0, 1.0, 0.0, 
  0.4*0.866, 0.4*-0.5, 0.2, 1.0, 0.7, 0.0, 

  1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 
  0.4*1.0, 0.4*0.0, 0.2, 1.0, 0.7, 0.0, 

  0.866, 0.5, 0.0, 1.0, 1.0, 0.0, 
  0.4*0.866, 0.4*0.5, 0.2, 1.0, 0.7, 0.0, 

  0.5, 0.866, 0.0, 1.0, 1.0, 0.0, 
  0.4*0.5, 0.4*0.866, 0.2, 1.0, 0.7, 0.0, 


  0.0, 1.0, 0.0, 1.0, 1.0, 0.0,
  0.4*0.0, 0.4*1.0, 0.2, 1.0, 0.7, 0.0, 

  //Flower Stem Top (Triangle Fan)

  0.0, 0.0, 0.0, 1.0, 0.5, 0.0,

  0.4*0.0, 0.4*1.0, 0.2, 1.0, 0.7, 0.0,  
  0.4*-0.5, 0.4*0.866, 0.2, 1.0, 0.7, 0.0, 
  0.4*-0.866, 0.4*0.5, 0.2, 1.0, 0.7, 0.0, 
  0.4*-1.0, 0.4*0.0, 0.2, 1.0, 0.7, 0.0, 
  0.4*-0.866, 0.4*-0.5, 0.2, 1.0, 0.7, 0.0,
  0.4*-0.5, 0.4*-0.866, 0.2, 1.0, 0.7, 0.0, 

  0.4*0.0, 0.4*-1.0, 0.2, 1.0, 0.7, 0.0,  
  0.4*0.5, 0.4*-0.866, 0.2, 1.0, 0.7, 0.0, 
  0.4*0.866, 0.4*-0.5, 0.2, 1.0, 0.7, 0.0, 
  0.4*1.0, 0.4*0.0, 0.2, 1.0, 0.7, 0.0, 
  0.4*0.866, 0.4*0.5, 0.2, 1.0, 0.7, 0.0,  
  0.4*0.5, 0.4*0.866, 0.2, 1.0, 0.7, 0.0, 

  0.4*0.0, 0.4*1.0, 0.2, 1.0, 0.7, 0.0, 


  //Flower Stem Link

  0.0, 1.0, 0.0,    0.0, 1.0, 0.0,
  0.0*0.4, 1.0*0.4, sq2,  0.4, 1.0, 0.0, 
  -0.5,  0.866, 0.0,    0.0, 1.0, 0.0, 

  -0.5*0.4,  0.866*0.4, sq2,  0.4, 1.0, 0.0, 
  -0.866, 0.5, 0.0,   0.0, 1.0, 0.0, 

  -0.866*0.4, 0.5*0.4, sq2,  0.4, 1.0, 0.0, 
   -1.0, 0.0, 0.0,   0.0, 1.0, 0.0, 

  -1.0*0.4, 0.0*0.4, sq2,   0.4, 1.0, 0.0, 
  -0.866, -0.5, 0.0,  0.0, 1.0, 0.0,

  -0.866*0.4, -0.5*0.4, sq2,   0.4, 1.0, 0.0, 
  -0.5,  -0.866, 0.0, 0.0, 1.0, 0.0, 

  -0.5*0.4,  -0.866*0.4, sq2,   0.4, 1.0, 0.0, 
  0.0, -1.0, 0.0,  0.0, 1.0, 0.0, 

  0.0*0.4, -1.0*0.4, sq2,  0.4, 1.0, 0.0, 
  0.5,  -0.866, 0.0,   0.0, 1.0, 0.0, 

  0.5*0.4,  -0.866*0.4, sq2,  0.4, 1.0, 0.0,
  0.866, -0.5, 0.0,  0.0, 1.0, 0.0,

  0.866*0.4, -0.5*0.4, sq2,   0.4, 1.0, 0.0,
  1.0,  0.0, 0.0,    0.0, 1.0, 0.0,

  1.0*0.4,  0.0*0.4, sq2,   0.4, 1.0, 0.0,
  0.866, 0.5, 0.0,  0.0, 1.0, 0.0,

  0.866*0.4, 0.5*0.4, sq2,  0.4, 1.0, 0.0,
  0.5, 0.866, 0.0,   0.0, 1.0, 0.0,

  0.5*0.4, 0.866*0.4, sq2, 0.4, 1.0, 0.0,

  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,
  0.0*0.4, 1.0*0.4, sq2, 0.4, 1.0, 0.0,


  //Flower Stem Body

  0.0*0.4, 1.0*0.4, sq2,  0.4, 1.0, 0.0, 
  0.0*0.4, 1.0*0.4, 3.0,  0.4, 1.0, 0.0, 

  -0.5*0.4,  0.866*0.4, sq2,   0.4, 1.0, 0.0, 
  -0.5*0.4,  0.866*0.4, 3.0,   0.4, 1.0, 0.0, 

  -0.866*0.4, 0.5*0.4, sq2,   0.4, 1.0, 0.0, 
  -0.866*0.4, 0.5*0.4, 3.0,   0.4, 1.0, 0.0, 

  -1.0*0.4, 0.0*0.4, sq2,    0.4, 1.0, 0.0, 
  -1.0*0.4, 0.0*0.4, 3.0,    0.4, 1.0, 0.0, 

  -0.866*0.4, -0.5*0.4, sq2,    0.4, 1.0, 0.0, 
  -0.866*0.4, -0.5*0.4, 3.0,    0.4, 1.0, 0.0, 

  -0.5*0.4,  -0.866*0.4, sq2,    0.4, 1.0, 0.0, 
  -0.5*0.4,  -0.866*0.4, 3.0,    0.4, 1.0, 0.0, 

  0.0*0.4, -1.0*0.4, sq2,   0.4, 1.0, 0.0, 
  0.0*0.4, -1.0*0.4, 3.0,   0.4, 1.0, 0.0, 

  0.5*0.4,  -0.866*0.4, sq2,  0.4, 1.0, 0.0,
  0.5*0.4,  -0.866*0.4, 3.0,  0.4, 1.0, 0.0,

  0.866*0.4, -0.5*0.4, sq2,   0.4, 1.0, 0.0,
  0.866*0.4, -0.5*0.4, 3.0,   0.4, 1.0, 0.0,

  1.0*0.4,  0.0*0.4, sq2,   0.4, 1.0, 0.0,
  1.0*0.4,  0.0*0.4, 3.0,   0.4, 1.0, 0.0,

  0.866*0.4, 0.5*0.4, sq2,   0.4, 1.0, 0.0,
  0.866*0.4, 0.5*0.4, 3.0,   0.4, 1.0, 0.0,

  0.5*0.4, 0.866*0.4, sq2, 0.4, 1.0, 0.0,
  0.5*0.4, 0.866*0.4, 3.0, 0.4, 1.0, 0.0,

  0.0*0.4, 1.0*0.4, sq2, 0.4, 1.0, 0.0,
  0.0*0.4, 1.0*0.4, 3.0, 0.4, 1.0, 0.0,

 //*******************FISH************************//


     //------FISH SECTION 1 (index = 188, len = 45)---------//

     0.0-0.6, -0.05,  -0.02,  1.0,  1.0,  0.4, //bottom left lip 1
     0.0-0.6, -0.05,  0.02,  1.0,  1.0,  0.4, //bottom right lip 2
     0.0-0.6,  0.05,  -0.02,  1.0,  0.4,  0.4, //top left lip 3

     0.0-0.6, -0.05,  0.02,  1.0,  1.0,  0.4, //bottom right lip 2
     0.0-0.6,  0.05,  -0.02,  1.0,  0.4,  0.4, //top left lip 3
     0.0-0.6,  0.05,  0.02,  1.0,  0.4,  0.4, //top right lip 4

     0.0-0.6, -0.05,  0.02,  1.0,  1.0,  0.4, //bottom right lip 2
     0.0-0.6,  0.05,  0.02,  1.0,  0.4,  0.4, //top right lip 4
     0.15-0.6,  0.0,  0.1,  1.0,  1.0,  0.4, //5

     0.0-0.6,  0.05,  0.02,  1.0,  0.4,  0.4, //top right lip 4
     0.15-0.6,  0.0,  0.1,  1.0,  1.0,  0.4, //5
     0.15-0.6,  0.12,  0.08,  1.0,  1.0,  0.4, //6

     0.0-0.6,  0.05,  0.02,  1.0,  0.4,  0.4, //top right lip 4
     0.15-0.6,  0.12,  0.08,  1.0,  1.0,  0.4, //6
     0.15-0.6,  0.2,  0.0,  1.0,  1.0,  0.4, //7

     0.0-0.6,  0.05,  -0.02,  1.0,  0.4,  0.4, //top left lip 3
     0.15-0.6,  0.2,  0.0,  1.0,  1.0,  0.4, //7
     0.0-0.6,  0.05,  0.02,  1.0,  0.4,  0.4, //top right lip 4

     0.0-0.6,  0.05,  -0.02,  1.0,  0.4,  0.4, //top left lip 3
     0.15-0.6,  0.2,  0.0,  1.0,  1.0,  0.4, //7
     0.15-0.6,  0.12,  -0.08,  1.0,  1.0,  0.4, //8

     0.0-0.6,  0.05,  -0.02,  1.0,  0.4,  0.4, //top left lip 3
     0.15-0.6,  0.12,  -0.08,  1.0,  1.0,  0.4, //8
     0.15-0.6,  0.0,  -0.1,  1.0,  1.0,  0.4, //9

     0.0-0.6,  0.05,  -0.02,  1.0,  0.4,  0.4, //top left lip 3
     0.0-0.6, -0.05,  -0.02,  1.0,  1.0,  0.4, //bottom left lip 1
     0.15-0.6,  0.0,  -0.1,  1.0,  1.0,  0.4, //9

     0.0-0.6, -0.05,  -0.02,  1.0,  1.0,  0.4, //bottom left lip 1
     0.15-0.6,  0.0,  -0.1,  1.0,  1.0,  0.4, //9
     0.15-0.6,  -0.12,  -0.08,  1.0,  1.0,  0.4, //10

     0.0-0.6, -0.05,  -0.02,  1.0,  1.0,  0.4, //bottom left lip 1
     0.15-0.6,  -0.12,  -0.08,  1.0,  1.0,  0.4, //10
     0.15-0.6,  -0.2,  0.0,  1.0,  1.0,  0.4, //11

     0.0-0.6, -0.05,  -0.02,  1.0,  1.0,  0.4, //bottom left lip 1
     0.0-0.6, -0.05,  0.02,  1.0,  1.0,  0.4, //bottom right lip 2
     0.15-0.6,  -0.2,  0.0,  1.0,  1.0,  0.4, //11

     0.0-0.6, -0.05,  0.02,  1.0,  1.0,  0.4, //bottom right lip 2
     0.15-0.6,  -0.2,  0.0,  1.0,  1.0,  0.4, //11
     0.15-0.6,  -0.12,  0.08,  1.0,  1.0,  0.4, //12

     0.0-0.6, -0.05,  0.02,  1.0,  1.0,  0.4, //bottom right lip 2
     0.15-0.6,  -0.12,  0.08,  1.0,  1.0,  0.4, //12
     0.15-0.6,  0.0,  0.1,  1.0,  1.0,  0.4, //5

     0.0-0.6, -0.05,  0.02,  1.0,  1.0,  0.4, //bottom right lip 2
     0.15-0.6,  0.0,  0.1,  1.0,  1.0,  0.4, //5
     0.0-0.6,  0.05,  0.02,  1.0,  0.4,  0.4, //top right lip 4

     //------FISH SECTION 2 (index = 233, len = 18)---------//
     

     0.15-0.6,  0.0,  0.1,  1.0,  1.0,  0.4, //5a
     -0.6+0.15*2,  0.0*1.5,  0.1*1.5,  1.0,  0.8,  0.0, //5b

     0.15-0.6,  0.12,  0.08,  1.0,  1.0,  0.4, //6a
     -0.6+0.15*2,  0.12*1.5,  0.08*1.5,  1.0,  0.8,  0.0, //6b

     0.15-0.6,  0.2,  0.0,  1.0,  1.0,  0.4, //7a
     -0.6+0.15*2,  0.2*1.5,  0.0*1.5,  1.0,  0.8,  0.0, //7b
     
     0.15-0.6,  0.12,  -0.08,  1.0,  1.0,  0.4, //8a
     -0.6+0.15*2,  0.12*1.5,  -0.08*1.5,  1.0,  0.8,  0.0, //8b

     0.15-0.6,  0.0,  -0.1,  1.0,  1.0,  0.4, //9a
     -0.6+0.15*2,  0.0*1.5,  -0.1*1.5,  1.0,  0.8,  0.0, //9b
     
     0.15-0.6,  -0.12,  -0.08,  1.0,  1.0,  0.4, //10a
     -0.6+0.15*2,  -0.12*1.5,  -0.08*1.5,  1.0,  0.8,  0.0, //10b
     
     0.15-0.6,  -0.2,  0.0,  1.0,  1.0,  0.4, //11a
     -0.6+0.15*2,  -0.2*1.5,  0.0*1.5,  1.0,  0.8,  0.0, //11b
     
     0.15-0.6,  -0.12,  0.08,  1.0,  1.0,  0.4, //12a
     -0.6+0.15*2,  -0.12*1.5,  0.08*1.5,  1.0,  0.8,  0.0, //12b

     0.15-0.6,  0.0,  0.1,  1.0,  1.0,  0.4, //5a
     -0.6+0.15*2,  0.0*1.5,  0.1*1.5,  1.0,  0.8,  0.0, //5b



     //------FISH SECTION 3 (index = 251, len = 18)---------//
     

     -0.6+0.15*4,  0.0*1.8,  0.1*1.8,  1.0,  0.5,  0.0, //5c
     -0.6+0.15*2,  0.0*1.5,  0.1*1.5,  1.0,  0.8,  0.0, //5b

     -0.6+0.15*4,  0.12*1.8,  0.08*1.8,  1.0,  0.5,  0.0, //6c
     -0.6+0.15*2,  0.12*1.5,  0.08*1.5,  1.0,  0.8,  0.0, //6b

     -0.6+0.15*4,  0.2*1.8,  0.0*1.8,  1.0,  0.5,  0.0, //7c
     -0.6+0.15*2,  0.2*1.5,  0.0*1.5,  1.0,  0.8,  0.0, //7b
     
     -0.6+0.15*4,  0.12*1.8,  -0.08*1.8,  1.0,  0.5,  0.0, //8c
     -0.6+0.15*2,  0.12*1.5,  -0.08*1.5,  1.0,  0.8,  0.0, //8b

     -0.6+0.15*4,  0.0*1.8,  -0.1*1.8,  1.0,  0.5,  0.0, //9c
     -0.6+0.15*2,  0.0*1.5,  -0.1*1.5,  1.0,  0.8,  0.0, //9b
     
     -0.6+0.15*4,  -0.12*1.8,  -0.08*1.8,  1.0,  0.5,  0.0, //10c
     -0.6+0.15*2,  -0.12*1.5,  -0.08*1.5,  1.0,  0.8,  0.0, //10b
     
     -0.6+0.15*4,  -0.2*1.8,  0.0*1.8,  1.0,  0.5,  0.0, //11c
     -0.6+0.15*2,  -0.2*1.5,  0.0*1.5,  1.0,  0.8,  0.0, //11b
     
     -0.6+0.15*4,  -0.12*1.8,  0.08*1.8,  1.0,  0.5,  0.0, //12c
     -0.6+0.15*2,  -0.12*1.5,  0.08*1.5,  1.0,  0.8,  0.0, //12b

     -0.6+0.15*4,  0.0*1.8,  0.1*1.8,  1.0,  0.5,  0.0, //5c
     -0.6+0.15*2,  0.0*1.5,  0.1*1.5,  1.0,  0.8,  0.0, //5b

    //------FISH SECTION 4 (index = 269, len = 18)---------//
     

     -0.6+0.15*4,  0.0*1.8,  0.1*1.8,  1.0,  0.5,  0.0, //5c
     -0.6+0.15*8,  0.0*1.4,  0.1*1.4,  1.0,  0.3,  0.0, //5d

     -0.6+0.15*4,  0.12*1.8,  0.08*1.8,  1.0,  0.5,  0.0, //6c
     -0.6+0.15*8,  0.12*1.4,  0.08*1.4,  1.0,  0.3,  0.0, //6d

     -0.6+0.15*4,  0.2*1.8,  0.0*1.8,  1.0,  0.5,  0.0, //7c
     -0.6+0.15*8,  0.2*1.4,  0.0*1.4,  1.0,  0.3,  0.0, //7d
     
     -0.6+0.15*4,  0.12*1.8,  -0.08*1.8,  1.0,  0.5,  0.0, //8c
     -0.6+0.15*8,  0.12*1.4,  -0.08*1.4,  1.0,  0.3,  0.0, //8d

     -0.6+0.15*4,  0.0*1.8,  -0.1*1.8,  1.0,  0.5,  0.0, //9c
     -0.6+0.15*8,  0.0*1.4,  -0.1*1.4,  1.0,  0.3,  0.0, //9d
     
     -0.6+0.15*4,  -0.12*1.8,  -0.08*1.8,  1.0,  0.5,  0.0, //10c
     -0.6+0.15*8,  -0.12*1.4,  -0.08*1.4,  1.0,  0.3,  0.0, //10d
     
     -0.6+0.15*4,  -0.2*1.8,  0.0*1.8,  1.0,  0.5,  0.0, //11c
     -0.6+0.15*8,  -0.2*1.4,  0.0*1.4,  1.0,  0.3,  0.0, //11d
     
     -0.6+0.15*4,  -0.12*1.8,  0.08*1.8,  1.0,  0.5,  0.0, //12c
     -0.6+0.15*8,  -0.12*1.4,  0.08*1.4,  1.0,  0.3,  0.0, //12d

     -0.6+0.15*4,  0.0*1.8,  0.1*1.8,  1.0,  0.5,  0.0, //5c
     -0.6+0.15*8,  0.0*1.4,  0.1*1.4,  1.0,  0.3,  0.0, //5d


    //------FISH SECTION 5 (index = 287, len = 18)---------//
     

     -0.6+0.15*11,  0.0*0.7,  0.1*0.7,  1.0,  0.1,  0.0, //5e
     -0.6+0.15*8,  0.0*1.4,  0.1*1.4,  1.0,  0.3,  0.0, //5d

     -0.6+0.15*11,  0.12*0.7,  0.08*0.7,  1.0,  0.1,  0.0, //6e
     -0.6+0.15*8,  0.12*1.4,  0.08*1.4,  1.0,  0.3,  0.0, //6d

     -0.6+0.15*11,  0.2*0.7,  0.0*0.7,  1.0,  0.1,  0.0, //7e
     -0.6+0.15*8,  0.2*1.4,  0.0*1.4,  1.0,  0.3,  0.0, //7d
     
     -0.6+0.15*11,  0.12*0.7,  -0.08*0.7,  1.0,  0.1,  0.0, //8e
     -0.6+0.15*8,  0.12*1.4,  -0.08*1.4,  1.0,  0.3,  0.0, //8d

     -0.6+0.15*11,  0.0*0.7,  -0.1*0.7,  1.0,  0.1,  0.0, //9e
     -0.6+0.15*8,  0.0*1.4,  -0.1*1.4,  1.0,  0.3,  0.0, //9d
     
     -0.6+0.15*11,  -0.12*0.7,  -0.08*0.7,  1.0,  0.1,  0.0, //10e
     -0.6+0.15*8,  -0.12*1.4,  -0.08*1.4,  1.0,  0.3,  0.0, //10d
     
     -0.6+0.15*11,  -0.2*0.7,  0.0*0.7,  1.0,  0.1,  0.0, //11e
     -0.6+0.15*8,  -0.2*1.4,  0.0*1.4,  1.0,  0.3,  0.0, //11d
     
     -0.6+0.15*11,  -0.12*0.7,  0.08*0.7,  1.0,  0.1,  0.0, //12e
     -0.6+0.15*8,  -0.12*1.4,  0.08*1.4,  1.0,  0.3,  0.0, //12d

     -0.6+0.15*11,  0.0*0.7,  0.1*0.7,  1.0,  0.1,  0.0, //5e
     -0.6+0.15*8,  0.0*1.4,  0.1*1.4,  1.0,  0.3,  0.0, //5d


     //------FISH SECTION 6 (index = 305, len = 18)---------//

     -0.6+0.15*11,  0.0*0.7,  0.1*0.7,  1.0,  0.1,  0.0, //5e
     -0.6+0.15*12,  0.0*0.3,  0.1*0.3,  1.0,  0.0,  0.0, //5f

     -0.6+0.15*11,  0.12*0.7,  0.08*0.7,  1.0,  0.1,  0.0, //6e
     -0.6+0.15*12,  0.12*0.3,  0.08*0.3,  1.0,  0.0,  0.0, //6f

     -0.6+0.15*11,  0.2*0.7,  0.0*0.7,  1.0,  0.1,  0.0, //7e
     -0.6+0.15*12,  0.2*0.3,  0.0*0.3,  1.0,  0.0,  0.0, //7f
     
     -0.6+0.15*11,  0.12*0.7,  -0.08*0.7,  1.0,  0.1,  0.0, //8e
     -0.6+0.15*12,  0.12*0.3,  -0.08*0.3,  1.0,  0.0,  0.0, //8f

     -0.6+0.15*11,  0.0*0.7,  -0.1*0.7,  1.0,  0.1,  0.0, //9e
     -0.6+0.15*12,  0.0*0.3,  -0.1*0.3,  1.0,  0.0,  0.0, //9f
     
     -0.6+0.15*11,  -0.12*0.7,  -0.08*0.7,  1.0,  0.1,  0.0, //10e
     -0.6+0.15*12,  -0.12*0.3,  -0.08*0.3,  1.0,  0.0,  0.0, //10f
     
     -0.6+0.15*11,  -0.2*0.7,  0.0*0.7,  1.0,  0.1,  0.0, //11e
     -0.6+0.15*12,  -0.2*0.3,  0.0*0.3,  1.0,  0.0,  0.0, //11f
     
     -0.6+0.15*11,  -0.12*0.7,  0.08*0.7,  1.0,  0.1,  0.0, //12e
     -0.6+0.15*12,  -0.12*0.3,  0.08*0.3,  1.0,  0.0,  0.0, //12f

     -0.6+0.15*11,  0.0*0.7,  0.1*0.7,  1.0,  0.1,  0.0, //5e
     -0.6+0.15*12,  0.0*0.3,  0.1*0.3,  1.0,  0.0,  0.0, //5f


     //------FISH FIN (index = 323, len = 15)---------//
     

     -0.6+0.15*12,  0.2*0.3,  0.0*0.3,  1.0,  0.0,  0.0, //7f
     -0.6+0.15*15, 0.5, 0.0, 1.0, 1.0, 0.0, //13g
     -0.6+0.15*15, 0.15, 0.0, 1.0, 1.0, 0.0, //14g

     -0.6+0.15*12,  0.2*0.3,  0.0*0.3,  1.0,  0.0,  0.0, //7f
     -0.6+0.15*14, 0.0, 0.0, 1.0, 1.0, 0.0, //h
     -0.6+0.15*15, 0.15, 0.0, 1.0, 1.0, 0.0, //14g

     -0.6+0.15*12,  0.2*0.3,  0.0*0.3,  1.0,  0.0,  0.0, //7f
     -0.6+0.15*14, 0.0, 0.0, 1.0, 1.0, 0.0, //h
     -0.6+0.15*12,  -0.2*0.3,  0.0*0.3,  1.0,  0.0,  0.0, //11f

     -0.6+0.15*12,  -0.2*0.3,  0.0*0.3,  1.0,  0.0,  0.0, //11f
     -0.6+0.15*14, 0.0, 0.0, 1.0, 1.0, 0.0, //h
     -0.6+0.15*15, -0.15, 0.0, 1.0, 1.0, 0.0, //15g

     -0.6+0.15*12,  -0.2*0.3,  0.0*0.3,  1.0,  0.0,  0.0, //11f
     -0.6+0.15*15, -0.5, 0.0, 1.0, 1.0, 0.0, //16g
     -0.6+0.15*15, -0.15, 0.0, 1.0, 1.0, 0.0, //15g

     //======NEW GROUND PLANE (index = 338)========//

     -50, 0, -50, 0, 0, 0.2,
     50, 0, -50, 0, 0, 0.2,
     50, 0, 50, 0, 0, 0.2,
     -50, 0, 50, 0, 0, 0.2,

    /* //======GROUND OBJECTS (index = 310)========//

      0.0, 2.0, 0.866, 1.0, 0.8, 0.8,
      1.0, 0.0, 0.0, 1.0, 0.5, 0.0,
      -1.0, 0.0, 0.0, 0.0, 1.0, 1.0,
      0.0, 0.0, 1.732, 0.5, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0, 0.5, 0.0, */

  ]);

  var count = 0;

  makeSphere();

  makeGroundGrid();
  //mySiz = colorShapes.length + gndVerts.length;
  mySiz = colorShapes.length + sphVerts.length + gndVerts.length;
  //mySiz = colorShapes.length;

  var nn = mySiz / floatsPerVertex;

  var verticesColors = new Float32Array(mySiz);
  vertStart = 0;
  for(i=0,j=0,k=0; j< colorShapes.length; i++,j++,k++) {
    verticesColors[i] = colorShapes[j];
    } 
  
  //gndStart = i;
  //for(j=0; j< gndVerts.length; i++, j++) {
  //  verticesColors[i] = gndVerts[j];
   // }

  sphStart = i;
  for(j=0, k=0; j< sphVerts.length; i++, j++, k++) {
    verticesColors[i] = sphVerts[j];
    }


  gndStart = j;
  for(k=0; k< gndVerts.length; i++, j++, k++) {
    verticesColors[i] = gndVerts[k];
    }


  // Create a vertex buffer object (VBO)
  var vertexColorbuffer = gl.createBuffer();  
  if (!vertexColorbuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Write vertex information to buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(a_Position);

  var a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
  if(a_Normal < 0) {
    console.log('Failed to get the storage location of a_Normal');
    return -1;
  }
  gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(a_Normal);

  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
  gl.enableVertexAttribArray(a_Color);



  return mySiz/floatsPerVertex; // return # of vertices

}

function makeSphere() {
  var slices = 13;    // # of slices of the sphere along the z axis. >=3 req'd
                      // (choose odd # or prime# to avoid accidental symmetry)
  var sliceVerts  = 27; // # of vertices around the top edge of the slice
                      // (same number of vertices on bottom of slice, too)
  var topColr = new Float32Array([0.0, 0.0, 0.0]);  // North Pole: light gray
  var equColr = new Float32Array([0.0, 0.0, 0.0]);  // Equator:    bright green
  var botColr = new Float32Array([0.0, 0.0, 0.0]);  // South Pole: brightest gray.
  var sliceAngle = Math.PI/slices;  // lattitude angle spanned by one slice.

  // Create a (global) array to hold this sphere's vertices:
  sphVerts = new Float32Array(  ((slices * 2* sliceVerts) -2) * floatsPerVertex);
                    // # of vertices * # of elements needed to store them. 
                    // each slice requires 2*sliceVerts vertices except 1st and
                    // last ones, which require only 2*sliceVerts-1.
                    
  // Create dome-shaped top slice of sphere at z=+1
  // s counts slices; v counts vertices; 
  // j counts array elements (vertices * elements per vertex)
  var cos0 = 0.0;         // sines,cosines of slice's top, bottom edge.
  var sin0 = 0.0;
  var cos1 = 0.0;
  var sin1 = 0.0; 
  var j = 0;              // initialize our array index
  var isLast = 0;
  var isFirst = 1;
  for(s=0; s<slices; s++) { // for each slice of the sphere,
    // find sines & cosines for top and bottom of this slice
    if(s==0) {
      isFirst = 1;  // skip 1st vertex of 1st slice.
      cos0 = 1.0;   // initialize: start at north pole.
      sin0 = 0.0;
    }
    else {          // otherwise, new top edge == old bottom edge
      isFirst = 0;  
      cos0 = cos1;
      sin0 = sin1;
    }               // & compute sine,cosine for new bottom edge.
    cos1 = Math.cos((s+1)*sliceAngle);
    sin1 = Math.sin((s+1)*sliceAngle);
    // go around the entire slice, generating TRIANGLE_STRIP verts
    // (Note we don't initialize j; grows with each new attrib,vertex, and slice)
    if(s==slices-1) isLast=1; // skip last vertex of last slice.
    for(v=isFirst; v< 2*sliceVerts-isLast; v++, j+=floatsPerVertex) { 
      if(v%2==0)
      {       // put even# vertices at the the slice's top edge
              // (why PI and not 2*PI? because 0 <= v < 2*sliceVerts
              // and thus we can simplify cos(2*PI(v/2*sliceVerts))  
        sphVerts[j  ] = sin0 * Math.cos(Math.PI*(v)/sliceVerts);  
        sphVerts[j+1] = sin0 * Math.sin(Math.PI*(v)/sliceVerts);  
        sphVerts[j+2] = cos0;   
        //sphVerts[j+3] = 1.0;      
      }
      else {  // put odd# vertices around the slice's lower edge;
              // x,y,z,w == cos(theta),sin(theta), 1.0, 1.0
              //          theta = 2*PI*((v-1)/2)/capVerts = PI*(v-1)/capVerts
        sphVerts[j  ] = sin1 * Math.cos(Math.PI*(v-1)/sliceVerts);    // x
        sphVerts[j+1] = sin1 * Math.sin(Math.PI*(v-1)/sliceVerts);    // y
        sphVerts[j+2] = cos1;                                       // z
        //sphVerts[j+3] = 1.0;                                        // w.   
      }
      if(s==0) {  // finally, set some interesting colors for vertices:
        sphVerts[j+3]=0.0; 
        sphVerts[j+4]=0.0;   //NORMALS
        sphVerts[j+5]=0.0; 
        }
      else if(s==slices-1) {
        sphVerts[j+3]=0.0; 
        sphVerts[j+4]=0.0;   //NORMALS
        sphVerts[j+5]=0.0;
      }
      else {
        sphVerts[j+3]=0.0; 
        sphVerts[j+4]=0.0;   //NORMALS
        sphVerts[j+5]=0.0;         
      }
    }
  }
}

function initArrayBuffer(gl, attribute, data, type, num) {
//-------------------------------------------------------------------------------
  // Create a buffer object
  var buffer = gl.createBuffer();
  if (!buffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // Write date into the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
  // Assign the buffer object to the attribute variable
  var a_attribute = gl.getAttribLocation(gl.program, attribute);
  if (a_attribute < 0) {
    console.log('Failed to get the storage location of ' + attribute);
    return false;
  }
  gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
  // Enable the assignment of the buffer object to the attribute variable
  gl.enableVertexAttribArray(a_attribute);

  return true;
}

//==================HTML Button Callbacks======================

function clearDrag() {
// Called when user presses 'Clear' button in our webpage
	xMdragTot = 0.0;
	yMdragTot = 0.0;
		  // REPORT updated mouse position on-screen
	document.getElementById('Mouse').innerHTML=
			'Mouse Drag totals (CVV coords):\t'+xMdragTot+', \t'+yMdragTot;	

	// NEW!  re-set the light-source global vars to its original values:
  lamp0.I_pos.elements.set([6.0, 5.0, 5.0]);
  draw();		// update GPU uniforms &  draw the newly-updated image.
}


//==================================Mouse and Keyboard event-handling Callbacks,
//								(modified from Week04 starter code: 5.04jt.ControlMulti.html))

function myMouseDown(ev, gl, canvas) {
//==============================================================================
  var rect = ev.target.getBoundingClientRect();	
  var xp = ev.clientX - rect.left;					
  var yp = canvas.height - (ev.clientY - rect.top);	
  var x = (xp - canvas.width/2)  /  (canvas.width/2);	
	var y = (yp - canvas.height/2) / (canvas.height/2);
	
	isDrag = true;
	xMclik = x;
	yMclik = y;
};


function myMouseMove(ev, gl, canvas) {
//==============================================================================

	if(isDrag==false) return;	

  var rect = ev.target.getBoundingClientRect();	
  var xp = ev.clientX - rect.left;	
	var yp = canvas.height - (ev.clientY - rect.top);	

  var x = (xp - canvas.width/2)  /  (canvas.width/2);
	var y = (yp - canvas.height/2) / (canvas.height/2);

	/*console.log('lamp0.I_pos.elements[0] = ', lamp0.I_pos.elements[0], '\n');
	lamp3.I_pos.elements.set([	
					lamp3.I_pos.elements[0],
					lamp3.I_pos.elements[1] + 4.0*(x-xMclik),
					lamp3.I_pos.elements[2] + 4.0*(y-yMclik)
													]);*/

  l3xpos += 4.0*(x-xMclik);
  l3ypos += 4.0*(y-yMclik);

	xMdragTot += (x - xMclik);
	yMdragTot += (y - yMclik);
	xMclik = x;		
	yMclik = y;
};

function myMouseUp(ev, gl, canvas) {
//==============================================================================

  var rect = ev.target.getBoundingClientRect();	// get canvas corners in pixels
  var xp = ev.clientX - rect.left;									// x==0 at canvas left edge
	var yp = canvas.height - (ev.clientY - rect.top);	// y==0 at canvas bottom edge
//  console.log('myMouseUp  (pixel coords): xp,yp=\t',xp,',\t',yp);
  
	// Convert to Canonical View Volume (CVV) coordinates too:
  var x = (xp - canvas.width/2)  / 		// move origin to center of canvas and
  						 (canvas.width/2);			// normalize canvas to -1 <= x < +1,
	var y = (yp - canvas.height/2) /		//										 -1 <= y < +1.
							 (canvas.height/2);
	console.log('myMouseUp  (CVV coords  ):  x, y=\t',x,',\t',y);
	
	isDrag = false;											// CLEAR our mouse-dragging flag, and
	// accumulate any final bit of mouse-dragging we did:
	xMdragTot += (x - xMclik);
	yMdragTot += (y - yMclik);
	console.log('myMouseUp: xMdragTot,yMdragTot =',xMdragTot,',\t',yMdragTot);
};


function myKeyUp(ev) {
//===============================================================================
// Called when user releases ANY key on the keyboard; captures scancodes well

	console.log('myKeyUp()--keyCode='+ev.keyCode+' released.');
}

function myKeyPress(ev) {



	//====PRE-MOVEMENT CALCULATIONS====//
    
    function normalize_divisor(x, y, z) {
      var div = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
      return div;
    }

  //---FORWARD VECTOR---//

    Dx = lookX - g_EyeX;
    Dy = lookY - g_EyeY;
    Dz = lookZ - g_EyeZ;

    //scale forward vector

    var fdiv = normalize_divisor(Dx, Dy, Dz);

    forward_vector[0] = Dx/fdiv;
    forward_vector[1] = Dy/fdiv;
    forward_vector[2] = Dz/fdiv;

  //---HORIZONTAL VECTOR---//

    horizontal_vector[0] = upY*forward_vector[2] - upZ*forward_vector[1];
    horizontal_vector[1] = upZ*forward_vector[0] - upX*forward_vector[2];
    horizontal_vector[2] = upX*forward_vector[1] - upY*forward_vector[0];

    //scale horizontal vector

    var hdiv = normalize_divisor(horizontal_vector[0], horizontal_vector[1], horizontal_vector[2]);

    horizontal_vector[0] = horizontal_vector[0]/hdiv;
    horizontal_vector[1] = horizontal_vector[1]/hdiv;
    horizontal_vector[2] = horizontal_vector[2]/hdiv;
//===============================================================================
// Best for capturing alphanumeric keys and key-combinations such as 
// CTRL-C, alt-F, SHIFT-4, etc.

	ev.preventDefault();

	switch(ev.keyCode)
	{	case 32: //spacebar
			pan = !pan;
			console.log(pan);
			break;

		case 37: //left arrow
      if (pan == false) {
        g_EyeX += increment * horizontal_vector[0];
        lookX += increment * horizontal_vector[0];

        g_EyeY += increment * horizontal_vector[1];
        lookY += increment * horizontal_vector[1];

        g_EyeZ += increment * horizontal_vector[2];
        lookZ += increment * horizontal_vector[2];
      }
      else {
        degree -= deg_inc;
        lookX = eyePosWorld[0] + Math.cos(degree * (pi/180));
        lookZ = g_EyeZ + Math.sin(degree * (pi/180));
      }
			break;

		case 38: //up arrow
		  if (pan == false) {
        g_EyeX += increment * forward_vector[0];
        lookX += increment * forward_vector[0];

        g_EyeY += increment * forward_vector[1];
        lookY += increment * forward_vector[1];

        g_EyeZ += increment * forward_vector[2];
        lookZ += increment * forward_vector[2];
      } else
 	      lookY += 0.1;

			break;

		case 39: //right arrow
			if (pan == false) {
        g_EyeX -= increment * horizontal_vector[0];
        lookX -= increment * horizontal_vector[0];

        g_EyeY -= increment * horizontal_vector[1];
        lookY -= increment * horizontal_vector[1];

        g_EyeZ -= increment * horizontal_vector[2];
        lookZ -= increment * horizontal_vector[2];
      } else
      {
        degree += deg_inc;
        lookX = g_EyeX + Math.cos(degree * (pi/180));
        lookZ = g_EyeZ + Math.sin(degree * (pi/180));
      }

			break;

		case 40: //down arrow
		  if (pan == false) {
        g_EyeX -= increment * forward_vector[0];
        lookX -= increment * forward_vector[0];

        g_EyeY -= increment * forward_vector[1];
        lookY -= increment * forward_vector[1];

        g_EyeZ -= increment * forward_vector[2];
        lookZ -= increment * forward_vector[2];
      } else
        lookY -= 0.1;
			break;

    case 49:            //'1' key, toggles headlamp
      l0on = !l0on;
      break;

    case 50:            //'2' key, toggles adjustable light source
      l1on = !l1on;
      break;

    case 51:            //'3' key, toggles light source
      l2on = !l2on;
      break;

    case 52:            //'4' key, toggles Blinn lighting
      l3on = !l3on;
      break;

    case 53:            //'5' key, toggles Gouraud lighting
      blinn = !blinn;
      console.log(blinn);
      break;

    case 54:            //'6' key, toggles Gouraud lighting
      gouraud = !gouraud;
      break;

    case 55:            //'7' key, switches ATT to default
      att_option = 0.0;
      break;

    case 56:            //'8' key, switches ATT to 1.0 (constant)
      att_option = 1.0;
      break;

    case 57:            //'9' key, switches ATT to 1/d
      att_option = 2.0;
      break;

    case 48:            //'0' key, switches ATT to 1/d^2
      att_option = 3.0;
      break;

		case 77:	// UPPER-case 'M' key:
		case 109:	// LOWER-case 'm' key:
			matlSel = (matlSel +1)%MATL_DEFAULT;
      matlSel1 = (matlSel +2)%MATL_DEFAULT;
      matlSel2 = (matlSel +3)%MATL_DEFAULT;		// see materials_Ayerdi.js for list
			console.log('MatlSel=', matlSel, '\n');
			matl0 = new Material(matlSel);
      matl1 = new Material(matlSel1);  
      matl2 = new Material(matlSel2);  					// REPLACE our current material, &
			draw();								// re-draw on-screen image.
			break;

		case 83: // UPPER-case 's' key:
			matl0.K_shiny += 1.0;								// INCREASE shinyness, but with a
			if(matl0.K_shiny > 128.0) matl0.K_shiny = 128.0;	// upper limit.
			console.log('UPPERcase S: ++K_shiny ==', matl0.K_shiny,'\n');	
			draw();														// re-draw on-screen image.
			break;

		case 115:	// LOWER-case 's' key:
			matl0.K_shiny += -1.0;								// DECREASE shinyness, but with a
			if(matl0.K_shiny < 1.0) matl0.K_shiny = 1.0;		// lower limit.
			console.log('lowercase s: --K_shiny ==', matl0.K_shiny, '\n');
			draw();													// re-draw on-screen image.
			break;

    case 68: //'d' key, switches between ambient, diffuse and specular RGB adjustment
      ADStoggle = (ADStoggle + 1) % 3
      break;

    case 73: //'i' key
      viewInstructions();
      break;
    case 90: //'z' key, +R
      switch(ADStoggle) {
        case 0:
          if (ambR <= 0.9)
            ambR += 0.1; 
          break;
        case 1:
          if (difR <= 0.9)
            difR += 0.1; 
          break;
        case 2:
          if (specR <= 0.9)
            specR += 0.1; 
          break
      }
      break;
      
    case 88: //'x' key, -R
      switch(ADStoggle) {
        case 0:
          if (ambR >= 0.1)
            ambR -= 0.1; 
          break;
        case 1:
          if (difR >= 0.1)
            difR -= 0.1; 
          break;
        case 2:
          if (specR >= 0.1)
            specR -= 0.1; 
          break
      }
      break;
      
    case 67: //'c' key, +G
      switch(ADStoggle) {
        case 0:
          if (ambG <= 0.9)
            ambG += 0.1; 
          break;
        case 1:
          if (difG <= 0.9)
            difG += 0.1; 
          break;
        case 2:
          if (specG <= 0.9)
            specG += 0.1; 
          break
      }
      break;
      
    case 86: //'v' key, -G
      switch(ADStoggle) {
        case 0:
          if (ambG >= 0.1)
            ambG -= 0.1; 
          break;
        case 1:
          if (difG >= 0.1)
            difG -= 0.1; 
          break;
        case 2:
          if (specG >= 0.1)
            specG -= 0.1; 
          break
      }
      break;
      
    case 66: //'b' key, +B
      switch(ADStoggle) {
        case 0:
          if (ambB <= 0.9)
            ambB += 0.1; 
          break;
        case 1:
          if (difB <= 0.9)
            difB += 0.1; 
          break;
        case 2:
          if (specB <= 0.9)
            specB += 0.1; 
          break
      }
      break;
      
    case 78: //'n' key, -B
      switch(ADStoggle) {
        case 0:
          if (ambB >= 0.1)
            ambB -= 0.1; 
          break;
        case 1:
          if (difB >= 0.1)
            difB -= 0.1; 
          break;
        case 2:
          if (specB >= 0.1)
            specB -= 0.1; 
          break
      }
      break;
      
    case 188: // '.' key
      if (numFish > 0) {
        numFish -= 1;
      }
      break;

    case 190: // ',' key
      numFish += 1;        
      break;

    case 189: // '=' key
      lens_ang -= 10;         
      break;

    case 187: // '-' key
      lens_ang += 10;         
      break;

		default:
		  break;
	}
}

var g_last = Date.now();

function animate(ticker) {
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  
  var newAngle = ticker + (ANGLE_STEP * elapsed) / 1000.0;
  return newAngle;
}


function makeGroundGrid() {
  var xcount = 100;     // # of lines
  var ycount = 100;   
  var xymax = 50.0; //grid size
  var xColr = new Float32Array([0.0, 1.0, 0.0]); 
  var yColr = new Float32Array([0.0, 1.0, 0.0]);

  gndVerts = new Float32Array(floatsPerVertex*2*(xcount+ycount));
  var xgap = xymax/(xcount-1);
  var ygap = xymax/(ycount-1);    
  
  for(v=0, j=0; v<2*xcount; v++, j+= floatsPerVertex) {
    if(v%2==0) {  // put even-numbered vertices at (xnow, -xymax, 0)
      gndVerts[j  ] = -xymax + (v  )*xgap;  // x
      gndVerts[j+1] = -xymax;               // y
      gndVerts[j+2] = 0.0;                  // z
    }
    else {        // put odd-numbered vertices at (xnow, +xymax, 0).
      gndVerts[j  ] = -xymax + (v-1)*xgap;  // x
      gndVerts[j+1] = xymax;                // y
      gndVerts[j+2] = 0.0;                  // z
    }
    gndVerts[j+3] = xColr[0];     // red
    gndVerts[j+4] = xColr[1];     // grn
    gndVerts[j+5] = xColr[2];     // blu
  }

  for(v=0; v<2*ycount; v++, j+= floatsPerVertex) {
    if(v%2==0) {
      gndVerts[j  ] = -xymax;               // x
      gndVerts[j+1] = -xymax + (v  )*ygap;  // y
      gndVerts[j+2] = 0.0;                  // z
    }
    else {
      gndVerts[j  ] = xymax;                // x
      gndVerts[j+1] = -xymax + (v-1)*ygap;  // y
      gndVerts[j+2] = 0.0;                  // z
    }
    gndVerts[j+3] = yColr[0];     // red
    gndVerts[j+4] = yColr[1];     // grn
    gndVerts[j+5] = yColr[2];     // blu
  }
}

function resizeCanvas() {

  nuCanvas = document.getElementById('webgl');
  nuGL = getWebGLContext(nuCanvas);

  nuCanvas.width = innerWidth;
  nuCanvas.height = innerHeight;

  gl.viewport(0, 0, nuCanvas.width, nuCanvas.height); 

  return nuGL;
  }

function viewInstructions() {
  alert("User Instructions:\n\nUse numbers to toggle lights (1: headlight, 2: overhead 3: backlight 4: adjustable frontlight) or to toggle Blinn (5) and Gouraud (6)\n\nUse arrow keys and spacebar to navigate. Spacebar will toggle between moving and adjusting angle of sight.\n\nUse mousedrag to move around light 4 (frontlight)\n\nTo adjust RGB values of light 4's amb, diff, and spec, use z (+R), x(-R), c(+G), v(-G), b(+B), n(-B), and d (switch between amb, diff, spec)\n\nAdjust camera lens angle with = (increase angle) and - (decrease angle)\n\nAdjust number of fish with , (decrease # of fish) and . (increase number of fish)\n\nTo view instructions again, press 'i'");
}