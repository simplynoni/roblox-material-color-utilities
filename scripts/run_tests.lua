local ReplicatedStorage = game:GetService('ReplicatedStorage')

local jest = require(ReplicatedStorage.rbxts_include.node_modules['@rbxts'].jest.src)

local status, result = jest.runCLI(ReplicatedStorage.material_color, {
    verbose = true,
    ci = false
}, {ReplicatedStorage.material_color}):awaitStatus()