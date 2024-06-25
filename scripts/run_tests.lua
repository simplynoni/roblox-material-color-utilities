local ReplicatedStorage = game:GetService('ReplicatedStorage')

print("Checking for ProcessService...")
local processServiceExists, ProcessService = pcall(function()
	return game:GetService("ProcessService")
end)
print(`ProcessService {processServiceExists and "exists" or "does not exist"}`)

local jest = require(ReplicatedStorage.rbxts_include.node_modules['@rbxts'].jest.src)

local status, result = jest.runCLI(ReplicatedStorage.material_color, {
    verbose = true,
    ci = false
}, {ReplicatedStorage.material_color}):awaitStatus()

if status == "Rejected" then
	print(result)
end

if status == "Resolved" and result.results.numFailedTestSuites == 0 and result.results.numFailedTests == 0 then
	if processServiceExists then
		ProcessService:ExitAsync(0)
	end
else 
    if processServiceExists then
	    ProcessService:ExitAsync(1)
    else 
        error()
    end
end