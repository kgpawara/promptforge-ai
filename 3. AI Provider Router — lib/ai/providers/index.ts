export function buildSystemPrompt({category, framework, style, model, advanced}: GenerateParams) {
  const fw: any = {
    'chain-of-thought': 'Use Chain-of-Thought: Think step by step.',
    'tree-of-thoughts': 'Use Tree-of-Thoughts: 3 branches, evaluate, converge.',
    'role-prompting': `Act as world-class ${category} expert.`,
    'react': 'ReAct: Thought -> Action -> Observation.',
    'meta-prompt': 'First improve the instruction, then execute.',
    'structured': 'Output JSON: {prompt, negative_prompt, params}'
  }
  return `You are PromptForge AI.\nCategory: ${category}\nFramework: ${fw[framework]}\nStyle: ${style}\nTarget: ${model}\nAdvanced: ${JSON.stringify(advanced)}\nGenerate optimized production-ready prompt.`
}

export async function generatePrompt(p: GenerateParams) {
  const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
  const res = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{role:'system', content: buildSystemPrompt(p)}, {role:'user', content: p.input}],
    temperature: p.advanced.temperature?? 0.7
  });
  return res.choices[0].message.content!;
}